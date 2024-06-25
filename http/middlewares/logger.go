package middlewares

import (
	"log"

	"github.com/gofiber/fiber/v2"
)

func Logging(c *fiber.Ctx) error {
    log.Print("%s %s", c.Method(), c.OriginalURL())
    return c.Next()
}
