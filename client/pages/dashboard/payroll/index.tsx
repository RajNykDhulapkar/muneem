import React, { useState } from "react";
import DashboardLayout from "../../../components/Layouts/DashboardLayout";
import DashboardMain from "../../../components/Mains/DashboardMain";

const Dashboard = () => {
    const [currentNavlinkIndex, setCurrentNavlinkIndex] = useState<number>(3);
    const [topNavElem, setTopNavElem] = useState<number>(0);
    return (
        <DashboardLayout
            currentNavlinkIndex={currentNavlinkIndex}
            setCurrentNavlinkIndex={setCurrentNavlinkIndex}
            pageTitle="Dashboard"
        >
            <DashboardMain topNavElem={topNavElem} setTopNavElem={setTopNavElem}>
                <div>
                    <div>
                        <div>Profit and Loss</div>
                        <div>Jun 2020 May 2021</div>
                    </div>
                    <div>
                        <div>
                            <div>Revenue</div>
                            <div>$235,534.00</div>
                            <div>+12.3%</div>
                        </div>
                        <div>
                            <div>Expense</div>
                            <div>$235,534.00</div>
                            <div>+12.3%</div>
                        </div>
                        <div>
                            <div>Net Profit</div>
                            <div>$235,534.00</div>
                            <div>+12.3%</div>
                        </div>
                    </div>

                    {/* display chart */}
                    <div>
                        {/* char comes here */}
                        chart
                    </div>
                </div>
            </DashboardMain>
        </DashboardLayout>
    );
};

export default Dashboard;
