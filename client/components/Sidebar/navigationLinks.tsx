export default [
    {
        name: "Dashboard",
        link: "/dashboard",
        svgIcon: (fillColor: string) => (
            <svg
                className={fillColor + " transition-all delay-75"}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
            >
                <path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z" />
            </svg>
        ),
        subLinks: [
            "/dashboard/income-statement",
            "/dashboard/balance-sheet",
            "/dashboard/cash-analysis",
        ],
    },
    {
        name: "TODO",
        link: "/dashboard/todo",
        svgIcon: (fillColor: string) => (
            <svg
                className={fillColor + " transition-all delay-75"}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
            >
                <path d="M19 15v-3h-2v3h-3v2h3v3h2v-3h3v-2h-.937zM4 7h11v2H4zm0 4h11v2H4zm0 4h8v2H4z" />
            </svg>
        ),
    },
    {
        name: "Bookkeeping",
        link: "/dashboard/bookkeeping",
        svgIcon: (fillColor: string) => (
            <svg
                className={fillColor + " transition-all delay-75"}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
            >
                <path d="M21 3h-7a2.98 2.98 0 0 0-2 .78A2.98 2.98 0 0 0 10 3H3a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h5.758c.526 0 1.042.214 1.414.586l1.121 1.121c.009.009.021.012.03.021.086.079.182.149.294.196h.002a.996.996 0 0 0 .762 0h.002c.112-.047.208-.117.294-.196.009-.009.021-.012.03-.021l1.121-1.121A2.015 2.015 0 0 1 15.242 20H21a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.758 18H4V5h6c.552 0 1 .449 1 1v12.689A4.032 4.032 0 0 0 8.758 18zM20 18h-4.758c-.799 0-1.584.246-2.242.689V6c0-.551.448-1 1-1h6v13z" />
            </svg>
        ),
    },
    {
        name: "Payroll",
        link: "/dashboard/payroll",
        svgIcon: (fillColor: string) => (
            <svg
                className={fillColor + " transition-all delay-75"}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
            >
                <path d="M20 3H5C3.346 3 2 4.346 2 6v12c0 1.654 1.346 3 3 3h15c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM5 19c-.552 0-1-.449-1-1V6c0-.551.448-1 1-1h15v3h-6c-1.103 0-2 .897-2 2v4c0 1.103.897 2 2 2h6.001v3H5zm15-9v4h-6v-4h6z" />
            </svg>
        ),
    },
    {
        name: "Bill Pay",
        link: "/dashboard/bill-pay",
        svgIcon: (fillColor: string) => (
            <svg
                className={fillColor + " transition-all delay-75"}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
            >
                <path d="M21 4H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zm-1 11a3 3 0 0 0-3 3H7a3 3 0 0 0-3-3V9a3 3 0 0 0 3-3h10a3 3 0 0 0 3 3v6z" />
                <path d="M12 8c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z" />
            </svg>
        ),
    },
];
