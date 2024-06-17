package http

import (
	"log"
	"os"

	"github.com/bagasjs/balance/app"
	"github.com/bagasjs/balance/http/controllers"
	"github.com/gofiber/fiber/v2"
)

var APP_URL = ":8080"

func Boot(app *app.State) {
    var controllers = map[string]controllers.Controller {
        "/api/accounts": controllers.NewAPIAccountController(app),
        "/api/transactions": controllers.NewAPITransactionController(app),
    }

    r := fiber.New()
    r.Static("/static", "./res/static/")
    r.Get("/dashboard", func(c *fiber.Ctx) error {
        return c.SendFile("./res/dashboard/index.html")
    })

    for prefix, controller := range controllers {
        r.Route(prefix, controller.Group)
    }

    if url, exists := os.LookupEnv("APP_URL"); exists {
        APP_URL = url
    }

    log.Fatal(r.Listen(APP_URL))
}
