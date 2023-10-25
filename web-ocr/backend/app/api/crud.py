# project/backend/app/api/crud.py
from app.models.pydantic import SummaryPayloadSchema
from app.models.tortoise import TextSummary
from typing import Union, List


async def post(payload: SummaryPayloadSchema) -> int:
    summary = TextSummary(
        summary=payload.summary,
    )
    await summary.save()
    return summary.id


async def get_all() -> List:
    summarys = await TextSummary.all().values()
    return summarys


async def get(id: int) -> Union[dict, None]:
    task = await TextSummary.filter(id=id).first().values()
    if task:
        return task[0]
    return None


async def put(id: int, payload: SummaryPayloadSchema) -> Union[dict, None]:
    task = await TextSummary.filter(id=id).update(
        summary=payload.summary
    )
    if task:
        update_task = await TextSummary.filter(id=id).first().values()
        return update_task[0]
    return None


async def delete(id: int) -> int:
    task = await TextSummary.filter(id=id).first().delete()
    return task