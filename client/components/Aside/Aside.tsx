import React from "react";
import dummy from "./dummy";

const Aside = () => {
    return (
        <div className="fixed inset-y-0 right-0 bg-white shadow-md max-h-screen w-60 p-4 flex flex-col items-start gap-2 divide-y-2 divide-slate-800 divide-opacity-50">
            <div>
                <div>user img</div>
                <div>Raj Dhulapkar</div>
                <div>Bell and Curves</div>
                ...
            </div>
            <div>
                <div>History</div>
                <div>
                    <div>Top Expenses</div> <div>Top Incomes</div>
                </div>
                <div>
                    {dummy.topExpenses.map((expense, index) => (
                        <div key={index}>
                            <div>{expense.category}</div>
                            <div>{expense.amount}</div>
                            <div>{expense.percentage}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Aside;
