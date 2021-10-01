## Device Client

Required:
- [shiv](https://pypi.org/project/shiv/)
- [jq](https://stedolan.github.io/jq/download/)

The device client is developed as a python package. For deploment it can be packaged as a zip app using shiv (running from device-src folder)

```
pip install shiv 
shiv --output-file pybuoyapp.pz --entry-point=pybuoy.device_client.start_client .\pybuoy\
```
