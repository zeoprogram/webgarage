import secrets
from datetime import datetime, timezone

from fastapi import APIRouter

from lib.db import db
from models.order import OrderCreate, OrderResponse


router = APIRouter()

GARAGE_ADDRESS = (
    "Jl desa jabon mekar gang jamur, RT05/RW04, "
    "Jabon Mekar, Kampung Sawah"
)

HOME_SERVICE_SURCHARGE = 100_000


def format_rupiah(value: int) -> str:
    return f"Rp {value:,}".replace(",", ".")


def build_whatsapp_message(
    order: OrderCreate,
    order_code: str,
    total: int,
) -> str:
    lines = [
        "Halo Haryadi Garage, saya ingin booking treatment.",
        f"Kode order: {order_code}",
        f"Nama: {order.customer_name}",
        f"No. WhatsApp: {order.customer_phone}",
        f"Kategori: {order.category.upper()}",
        f"Tipe: {order.vehicle_variant}",
        (
            "Layanan: Home Service Jabodetabek"
            if order.service_mode == "home_service"
            else "Layanan: Workshop"
        ),
        f"Jadwal: {order.scheduled_date} pukul "
        f"{order.scheduled_time} WIB",
        "",
        "Detail layanan:",
    ]

    for item in order.items:
        line_total = item.unit_price * item.quantity
        lines.append(
            f"- {item.name} x{item.quantity}: "
            f"{format_rupiah(line_total)}"
        )

    if order.service_mode == "home_service":
        lines.append(
            f"- Transport Jabodetabek: "
            f"{format_rupiah(HOME_SERVICE_SURCHARGE)}"
        )

    lines.extend(["", f"Estimasi total: {format_rupiah(total)}"])

    if order.notes.strip():
        lines.append(f"Catatan: {order.notes.strip()}")

    lines.extend(["", f"Alamat workshop: {GARAGE_ADDRESS}"])

    return "\n".join(lines)


@router.post("/orders", response_model=OrderResponse)
async def create_order(order: OrderCreate) -> OrderResponse:
    created_at = datetime.now(timezone.utc)
    order_code = (
        f"HG-{created_at:%Y%m%d}-"
        f"{secrets.token_hex(3).upper()}"
    )

    services_total = sum(
        item.unit_price * item.quantity
        for item in order.items
    )

    total = services_total

    if order.service_mode == "home_service":
        total += HOME_SERVICE_SURCHARGE

    message = build_whatsapp_message(order, order_code, total)

    document = order.model_dump()
    document.update(
        {
            "order_code": order_code,
            "created_at": created_at,
            "total": total,
            "whatsapp_message": message,
        }
    )

    await db.orders.insert_one(document)

    return OrderResponse(
        order_code=order_code,
        created_at=created_at,
        total=total,
        whatsapp_message=message,
    )
