package controllers

import "github.com/gofiber/fiber/v2"

type Controller interface {
    Group(r fiber.Router)
}
