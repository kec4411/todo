# project/backend/app/main.py
import logging
import os

from fastapi import FastAPI, HTTPException, Path
from typing import List

from app.api import crud
from app.db import init_db
from fastapi.middleware.cors import CORSMiddleware
from app.models.tortoise import SummarySchema
from app.models.pydantic import SummaryPayloadSchema, SummaryResponseSchema


log = logging.getLogger("uvicorn")


app = FastAPI()

origins = [
    "*",
    "localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.on_event("startup")
async def startup_event():
    log.info("Starting up...")
    init_db(app)


@app.on_event("shutdown")
async def shutdown_event():
    log.info("Shutting down...")


@app.post("/todos", response_model=SummaryResponseSchema, status_code=201)
async def create_summary(payload: SummaryPayloadSchema) -> SummaryResponseSchema:
    summary_id = await crud.post(payload)

    response_object = {
        "id": summary_id,
        "summary": payload.summary
    }
    return response_object


@app.get("/todos", response_model=List[SummarySchema])
async def read_all_todo() -> List[SummarySchema]:
    return await crud.get_all()


@app.put("/todos/{id}/", response_model=SummarySchema)
async def update_todo(payload: SummaryPayloadSchema, id: int = Path(..., gt=0)) -> SummarySchema:
    todo = await crud.put(id, payload)
    if not todo:
        raise HTTPException(status_code=404,detail="Todos not found")
    return todo


@app.delete("/todos/{id}/", response_model=SummaryResponseSchema)
async def delete_todo(id: int = Path(..., gt=0)) -> SummaryResponseSchema:
    todo = await crud.get(id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todos not found")
    await crud.delete(id)
    return todo
