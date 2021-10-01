from setuptools import setup

setup(
    name="pybuoy",
    version="0.1.0",
    description="Raspberry Pi Zeor device client",
    packages=["pybuoy"],
    install_requires=['azure-iot-device']
)