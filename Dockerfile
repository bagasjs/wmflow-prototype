FROM golang:1.21.11-alpine

RUN apk update && apk add --no-cache git

WORKDIR /var/www

COPY . .

RUN go mod tidy

RUN go build -o balance

ENTRYPOINT [ "/var/www/balance" ]
