import React from "react";

import { withAuth } from "@/hocs";

const Home: React.FC = () => <div>Expenses</div>;

export default withAuth(Home);
