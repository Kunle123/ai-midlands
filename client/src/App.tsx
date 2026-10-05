import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import BBCArticle from "./pages/BBCArticle";
import {
  BusinessAutomationLanding,
  CustomerAssistantsLanding,
  SalesAutomationLanding,
  WorkflowAutomationLanding,
} from "./pages/ServiceLanding";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/business-automation"} component={BusinessAutomationLanding} />
      <Route path={"/workflow-automation"} component={WorkflowAutomationLanding} />
      <Route path={"/customer-assistants"} component={CustomerAssistantsLanding} />
      <Route path={"/sales-automation"} component={SalesAutomationLanding} />
      <Route path={"/bbc-article"} component={BBCArticle} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
