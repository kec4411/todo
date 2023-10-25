from pydantic import BaseModel


class SummaryPayloadSchema(BaseModel):
    summary: str


class SummaryResponseSchema(SummaryPayloadSchema):
    id: int
