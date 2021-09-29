# Certificate Chain Generation

Required:
- [Vault](https://www.vaultproject.io/downloads)
- [jq](https://stedolan.github.io/jq/download/)

The steps below describe the process of generating a chain of certificates for use by multiple devices. Each device will be assigned a unique leaf certificate. The Powershell commands were run on Windows

### Start Vault

Run vault `.\vault.exe server -config=<full path to config.hcl>`

Complete inital configuration for vault and retrieve the root token

### Set Environment Variables
```
$env:VAULT_ADDR="http://127.0.0.1:8200"
$env:VAULT_TOKEN="<root token>"
$VAULT_ADDR=$env:VAULT_ADDR
```

### Create Root CA

```
vault secrets enable pki

vault secrets tune -max-lease-ttl=876000h pki

vault write -field=certificate pki/root/generate/internal common_name="save-nemo" ttl=876000h > CA_cert.crt

vault write pki/config/urls issuing_certificates="$VAULT_ADDR/v1/pki/ca"  crl_distribution_points="$VAULT_ADDR/v1/pki/crl"
```

### Create Intermediate CA

```
vault secrets enable -path=pki_int pki

vault secrets tune -max-lease-ttl=849600h pki_int

vault write -format=json pki/root/sign-intermediate csr=@pki_intermediate.csr format=pem_bundle ttl="849600h" | jq -r '.data.certificate' > intermediate.cert.pem

vault write pki_int/intermediate/set-signed certificate=@intermediate.cert.pem
```

### Creat Role
```
vault write pki_int/roles/buoy allow_any_name=true client_flag=true basic_constraints_valid_for_non_ca=true max_ttl="871200h"
```

### Create Device Certificate
Certificate and private key are output to console. Save these to files for use on the device. The common name represents the unique identifier for the device
```
vault write pki_int/issue/buoy common_name="buoy01" ttl="868800"
```

https://learn.hashicorp.com/tutorials/vault/pki-engine