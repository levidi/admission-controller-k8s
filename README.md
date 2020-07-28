
# Custom dynamic admission control in kubernetes

## Docker

### Creating image

```bash
docker build -t {user}/admission-controller-k8s:{version} .
```
docker build -t leviditomazzo/admission-controller-k8s:v1 .

kubectl logs  -c webhook-server -n security 