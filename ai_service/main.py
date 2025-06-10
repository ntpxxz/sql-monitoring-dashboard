# ============================================================================
# FILE: ai_service/main.py
# The main FastAPI application for the AI Optimization Service.
# ============================================================================
import os
import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# --- 1. INITIALIZATION & CONFIGURATION ---

# Initialize the FastAPI app
app = FastAPI(
    title="SQL Optimization AI Service",
    description="An API service that uses Google's Gemini to analyze and suggest optimizations for T-SQL queries.",
    version="1.0.0"
)

# Configure CORS (Cross-Origin Resource Sharing)
# Allows the Node.js backend (running on a different port) to call this service.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure the Gemini API client
# In a real production environment, load the API key from a secure source.
# For example, using python-dotenv to load from a .env file.
# from dotenv import load_dotenv
# load_dotenv()
# genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
# When running in some environments, the API key might be injected automatically.

# --- 2. DATA MODELS (using Pydantic) ---

# Defines the structure of the incoming request body
class QueryRequest(BaseModel):
    query_text: str = Field(..., description="The T-SQL query to be optimized.")
    db_schema: str = Field("", description="Optional: The database schema for context. Formatted as a string.")

# Defines the structure of the successful response
class OptimizationSuggestion(BaseModel):
    optimized_sql: str
    explanation: str

# --- 3. PROMPT ENGINEERING ---

def create_optimization_prompt(query: str, schema: str) -> str:
    """
    Creates a detailed and effective prompt for the Gemini model.
    """
    prompt = f"""
    You are an expert SQL Server Database Administrator (DBA) with 20 years of experience specializing in performance tuning.
    Your task is to analyze the following T-SQL query and provide an optimized version along with a clear, actionable explanation.

    **Analysis Context:**

    1.  **Original Query to Analyze:**
        ```sql
        {query}
        ```

    2.  **Database Schema (if provided):**
        ```
        {schema if schema else "No schema provided. Analyze based on standard T-SQL best practices."}
        ```

    **Instructions:**

    1.  **Rewrite the Query:** Provide an optimized version of the query. If the query is already optimal, state that and explain why.
    2.  **Explain Your Changes:** Clearly explain the reasoning behind each optimization. Refer to specific changes, such as:
        -   Index recommendations (suggest specific indexes to create).
        -   Join improvements (e.g., changing JOIN order, using appropriate JOIN types).
        -   WHERE clause optimization (e.g., using SARGEable predicates).
        -   Avoiding common performance pitfalls (e.g., cursors, unnecessary wildcards).
    3.  **Format the Output:** Return your response STRICTLY as a JSON object with two keys: "optimized_sql" and "explanation".

    **Example JSON Output:**
    {{
      "optimized_sql": "SELECT a.col1, b.col2 FROM TableA a WITH (NOLOCK) JOIN TableB b ON a.id = b.a_id WHERE a.status = 1;",
      "explanation": "1. Added WITH (NOLOCK) to reduce locking contention in a high-transaction environment. 2. Ensured the join is on an indexed column (assuming a.id and b.a_id are indexed). 3. The WHERE clause on a.status is SARGEable, allowing for efficient index seeks."
    }}

    Now, provide your expert analysis for the query above.
    """
    return prompt

# --- 4. API ENDPOINT ---

@app.post("/optimize-query", response_model=OptimizationSuggestion)
async def optimize_query(request: QueryRequest):
    """
    Receives a SQL query, sends it to the Gemini API for analysis,
    and returns the optimization suggestions.
    """
    print("Received query for optimization...")
    
    # It's good practice to ensure the Gemini API is configured before proceeding.
    # if not os.getenv("GEMINI_API_KEY"):
    #     raise HTTPException(status_code=500, detail="Gemini API key is not configured on the server.")

    try:
        # Initialize the generative model
        model = genai.GenerativeModel('gemini-2.0-flash') # Use a fast and capable model
        
        # Create the detailed prompt
        prompt = create_optimization_prompt(request.query_text, request.db_schema)
        
        # Set generation config to ensure JSON output
        generation_config = genai.types.GenerationConfig(
            response_mime_type="application/json"
        )

        # Send the request to the Gemini API
        response = await model.generate_content_async(
            prompt, 
            generation_config=generation_config
        )
        
        # The model is configured to return a JSON object directly
        # The response.text will be a JSON string, which FastAPI automatically handles
        # when converting to the `response_model`.
        return response.candidates[0].content.parts[0].text

    except Exception as e:
        print(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail=f"An error occurred while communicating with the AI service: {str(e)}")

# --- 5. ROOT ENDPOINT (for health check) ---

@app.get("/")
def read_root():
    return {"status": "AI Optimization Service is running."}
