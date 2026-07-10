from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI(title="E-Commerce AI Service", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class VisualSearchResponse(BaseModel):
    detected_objects: List[str]
    category_suggestion: str
    confidence: float

@app.get("/")
def read_root():
    return {"status": "ok", "service": "AI Service"}

@app.post("/api/ai/visual-search", response_model=VisualSearchResponse)
async def visual_search(file: UploadFile = File(...)):
    # Placeholder for the visual search model processing state
    return VisualSearchResponse(
        detected_objects=["dress", "pink dress", "evening dress"],
        category_suggestion="dresses",
        confidence=0.94
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
