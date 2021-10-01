# -------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See License.txt in the project root for
# license information.
# --------------------------------------------------------------------------
import os
import asyncio
from azure.iot.device import X509
from azure.iot.device.aio import ProvisioningDeviceClient
from azure.iot.device.aio import IoTHubDeviceClient
from azure.iot.device import Message
import random
import json
import uuid
from argparse import ArgumentParser

# provisioning_host = os.getenv("PROVISIONING_HOST")
# id_scope = os.getenv("PROVISIONING_IDSCOPE")
# registration_id = os.getenv("DPS_X509_REGISTRATION_ID")
messages_to_send = 10
message_counter = 0

async def main():

    parser = ArgumentParser()
    parser.add_argument("-p", "--provisioning-host", dest="provisioning_host", default=os.getenv("PROVISIONING_HOST"))
    parser.add_argument("-i", "--id-scope", dest="id_scope", default=os.getenv("PROVISIONING_IDSCOPE"))
    parser.add_argument("-r", "--registration-id", dest="registration_id", default=os.getenv("DPS_X509_REGISTRATION_ID"))
    parser.add_argument("-c", "--cert-file", dest="cert_file", default=os.getenv("X509_CERT_FILE"))
    parser.add_argument("-k", "--key-file", dest="key_file", default=os.getenv("X509_KEY_FILE"))
    parser.add_argument("-w", "--passphrase", dest="passphrase", default=os.getenv("PASS_PHRASE"))

    args = parser.parse_args()

    print("Arguments loaded:")
    print(f"provisioning_host: {args.provisioning_host}")
    print(f"id_scope: {args.id_scope}")

    print(f"registration_id: {args.registration_id}")
    print(f"cert_file: {args.cert_file}")
    print(f"key_file: {args.key_file}")
    print(f"passphrase: {args.passphrase}")

    provisioning_host = args.provisioning_host
    id_scope = args.id_scope
    registration_id = args.registration_id
  
    x509 = X509(
        #cert_file=os.getenv("X509_CERT_FILE"),
        #key_file=os.getenv("X509_KEY_FILE"),
        #pass_phrase=os.getenv("PASS_PHRASE"),
        cert_file=args.cert_file,
        key_file=args.key_file,
        pass_phrase=args.passphrase,
    )

    provisioning_device_client = ProvisioningDeviceClient.create_from_x509_certificate(
        provisioning_host=provisioning_host,
        registration_id=registration_id,
        id_scope=id_scope,
        x509=x509,
    )

    registration_result = await provisioning_device_client.register()

    print("The complete registration result is")
    print(registration_result.registration_state)

    if registration_result.status == "assigned":
        print("Will send telemetry from the provisioned device")
        device_client = IoTHubDeviceClient.create_from_x509_certificate(
            x509=x509,
            hostname=registration_result.registration_state.assigned_hub,
            device_id=registration_result.registration_state.device_id,
        )

        # Connect the client.
        await device_client.connect()

        
 
    else:
        print("Can not connect as provisioned device")


    async def send_test_message(i):
        telemetry = {"widgetsBuilt": i}
        msg = Message(json.dumps(telemetry))
        msg.content_encoding = "utf-8"
        msg.content_type = "application/json"
        msg.message_id = uuid.uuid4()
        await device_client.send_message(msg)

    async def report_properties(device_client):
        reported_properties = {"batteryLevel": random.randint(0, 100)}
        print(f"Sending reported batteryLevel {reported_properties['batteryLevel']}")
        await device_client.patch_twin_reported_properties(reported_properties)

    # define behavior for receiving a twin patch
    async def twin_patch_listener(device_client):
        while True:
            patch = await device_client.receive_twin_desired_properties_patch()  # blocking call
            print("the data in the desired properties patch was: {}".format(patch))


    async def device_telemetry_sender(device_client):
        global message_counter

        while True:
            print(f"Sending message {message_counter}")
            await send_test_message(message_counter)
            message_counter = message_counter + 1

            if message_counter % 2 == 0:
                print("Sending reported property")
                await report_properties(device_client)
            await asyncio.sleep(5)


    # define behavior for halting the application
    def stdin_listener():
        while True:
            selection = input("Press Q to quit\n")
            if selection == "Q" or selection == "q":
                print("Quitting...")
                break

    # Schedule task for twin patch
    asyncio.create_task(twin_patch_listener(device_client))

    # Schedule task for twin patch
    asyncio.create_task(device_telemetry_sender(device_client))

    # Run the stdin listener in the event loop
    loop = asyncio.get_running_loop()
    user_finished = loop.run_in_executor(None, stdin_listener)
 
    # Wait for user to indicate they are done listening for messages
    await user_finished
 
    # Finally, disconnect
    await device_client.disconnect()

def start_client():
    asyncio.run(main())

if __name__ == "__main__":
    start_client()

    # If using Python 3.6 or below, use the following code instead of asyncio.run(main()):
    # loop = asyncio.get_event_loop()
    # loop.run_until_complete(main())
    # loop.close()