import FusePageSimple from "@fuse/core/FusePageSimple";
import withReducer from "app/store/withReducer";
import FinanceDashboardAppHeader from "./FinanceDashboardAppHeader";
import reducer from "./store";

function FinanceDashboardApp() {
  return (
    <FusePageSimple
      header={<FinanceDashboardAppHeader />}
      content={
        <div className="w-full px-24 md:px-32 pb-24">
          {/* {useMemo(() => {
            const container = {
              show: {
                transition: {
                  staggerChildren: 0.06,
                },
              },
            };

            const item = {
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            };

            return (
              !_.isEmpty(widgets) && (
                <motion.div className="w-full" variants={container} initial="hidden" animate="show">
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-32 w-full mt-32">
                    <div className="grid gap-32 sm:grid-flow-col xl:grid-flow-row">
                      <motion.div variants={item} className="flex flex-col flex-auto">
                        <PreviousStatementWidget />
                      </motion.div>

                      <motion.div variants={item} className="flex flex-col flex-auto">
                        <CurrentStatementWidget />
                      </motion.div>
                    </div>
                    <motion.div variants={item} className="flex flex-col flex-auto">
                      <AccountBalanceWidget />
                    </motion.div>
                  </div>
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-32 w-full mt-32">
                    <motion.div variants={item} className="xl:col-span-2 flex flex-col flex-auto">
                      <RecentTransactionsWidget />
                    </motion.div>
                    <motion.div variants={item} className="flex flex-col flex-auto">
                      <BudgetWidget />
                    </motion.div>
                  </div>
                </motion.div>
              )
            );
          }, [widgets])} */}
        </div>
      }
    />
  );
}

export default withReducer("financeDashboardApp", reducer)(FinanceDashboardApp);
