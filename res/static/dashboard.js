(async () => {
    const balance = new Balance(window.location.origin)
    const r = Router({
        "/": () => tag("div").child$(
            tag("h1").child$("Welcome to Balance"),
        ),
        "/journal": () => tag("div").child$(
        ),
        "/ledger": () => tag("div").child$(
            tag("h1").class$("text-3xl").child$("General Ledger"),
            tag("div").class$("text-3xl").child$("Please wait"),
        ),
    })

    r.awaits("/ledger", )
    balance.accounts().then(accounts => {
        r.routes$["/ledger"] = () => tag("div").child$(
            tag("h1").class$("text-3xl").child$("General Ledger"),
            accounts.map(account => tag("div").class$("text-3xl").child$(
                tag("h3").class$("text-3xl").child$(account.name),
            )))
        r.refresh$()
    })
    document.getElementById("app").appendChild(r)
})()
