# project/backend/app/models/tortoise.py
from tortoise import fields, models
from tortoise.contrib.pydantic import pydantic_model_creator


class TextSummary(models.Model):
	summary = fields.TextField()
	created_at = fields.DatetimeField(auto_now_add=True)

	def __str__(self):
		return self.summary


SummarySchema = pydantic_model_creator(TextSummary)