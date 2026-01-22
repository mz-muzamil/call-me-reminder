import os
import httpx
import logging

logger = logging.getLogger(__name__)

VAPI_URL = "https://api.vapi.ai/call/phone"
VAPI_PRIVATE_KEY = os.getenv("VAPI_PRIVATE_KEY")
VAPI_PHONE_NUMBER = os.getenv("VAPI_PHONE_NUMBER")

async def trigger_call(phone_number: str, message: str):
    """
    Triggers an outbound call via Vapi.
    """
    if not VAPI_PRIVATE_KEY:
        logger.warning("VAPI_PRIVATE_KEY not set. Skipping call.")
        return {"status": "skipped", "reason": "no_key"}
    
    headers = {
        "Authorization": f"Bearer {VAPI_PRIVATE_KEY}",
        "Content-Type": "application/json",
    }
    
    # Constructing the payload based on Vapi documentation (assumed generic structure)
    # The requirement says: Payload must include the spoken `message` and the `customer.number`.
    payload = {
        "phoneNumberId": VAPI_PHONE_NUMBER,
        "customer": {
            "number": phone_number,
        },
        "assistant": {
            "firstMessage": message,
            # We can define more assistant properties here or use an assistantId
            "model": {
                "provider": "openai",
                "model": "gpt-3.5-turbo",
                "messages": [
                    {"role": "system", "content": "You are a helpful reminder assistant."}
                ]
            }
        }
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(VAPI_URL, json=payload, headers=headers, timeout=10.0)
            response.raise_for_status()
            logger.info(f"Vapi call triggered for {phone_number}")
            return response.json()
    except httpx.HTTPError as e:
        logger.error(f"Failed to trigger Vapi call: {e}")
        raise e
