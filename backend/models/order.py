from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


class RootResponse(BaseModel):
    message: str


class OrderItemCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    quantity: int = Field(default=1, ge=1, le=10)
    unit_price: int = Field(ge=0, le=10_000_000)


class OrderCreate(BaseModel):
    customer_name: str = Field(min_length=2, max_length=80)
    customer_phone: str = Field(min_length=8, max_length=24)
    category: Literal["motor", "mobil", "helm"]
    vehicle_variant: str = Field(min_length=1, max_length=80)
    service_mode: Literal["workshop", "home_service"]
    scheduled_date: str = Field(min_length=8, max_length=10)
    scheduled_time: str = Field(min_length=4, max_length=5)
    items: list[OrderItemCreate] = Field(min_length=1, max_length=12)
    notes: str = Field(default="", max_length=600)


class OrderResponse(BaseModel):
    order_code: str
    created_at: datetime
    total: int
    whatsapp_message: str
