import { cn } from "@/lib/utils";

type ProjectVisualProps = {
  type: "marketplace" | "database" | "focus";
  variant?: string;
  compact?: boolean;
};

function MarketplaceVisual({ variant }: { variant?: string }) {
  return (
    <div className={cn("mock-window marketplace-ui", variant && `visual-${variant}`)}>
      <div className="mock-topbar"><i /><i /><i /><span>ruangusaha.app</span></div>
      <div className="market-body">
        <aside><span className="logo-chip">R</span><i /><i /><i /></aside>
        <div className="market-content">
          <div className="mock-heading"><span>Find the right creative service</span><i /></div>
          <div className="service-grid">
            <div><i className="service-art art-one" /><b>Social content</b><span>Campaign pack</span></div>
            <div><i className="service-art art-two" /><b>Product photo</b><span>Starter set</span></div>
            <div><i className="service-art art-three" /><b>Brand design</b><span>Visual identity</span></div>
          </div>
          <div className="market-lines"><i /><i /><i /></div>
        </div>
      </div>
    </div>
  );
}

function DatabaseVisual({ variant }: { variant?: string }) {
  return (
    <div className={cn("database-ui", variant && `visual-${variant}`)}>
      <div className="db-toolbar"><span>BUS_RESERVATION</span><i>SQL</i></div>
      <div className="schema-map" aria-hidden="true">
        <div className="entity entity-a"><b>ROUTE</b><span>route_id</span><span>origin</span></div>
        <div className="entity entity-b"><b>SCHEDULE</b><span>schedule_id</span><span>route_id</span></div>
        <div className="entity entity-c"><b>BOOKING</b><span>booking_id</span><span>passenger_id</span></div>
        <div className="entity entity-d"><b>PASSENGER</b><span>passenger_id</span><span>name</span></div>
        <svg viewBox="0 0 500 260" preserveAspectRatio="none"><path d="M125 65H250V95"/><path d="M375 95V170H300"/><path d="M185 205H120V140"/></svg>
      </div>
      <div className="db-status"><i /> constraints valid <span>04 entities</span></div>
    </div>
  );
}

function FocusVisual({ variant }: { variant?: string }) {
  return (
    <div className={cn("focus-stage", variant && `visual-${variant}`)}>
      <div className="phone-shell">
        <div className="phone-top"><span>9:41</span><i /></div>
        <div className="focus-greeting"><span>MON, 21 SEP</span><b>Good morning.</b></div>
        <div className="focus-ring"><div><b>24:18</b><span>FOCUS</span></div></div>
        <div className="focus-task"><i /><span><b>Portfolio case study</b><small>Current session</small></span><em>•••</em></div>
        <div className="habit-row"><i /><i className="done" /><i /></div>
      </div>
    </div>
  );
}

export function ProjectVisual({ type, variant, compact = false }: ProjectVisualProps) {
  return (
    <div className={cn("project-visual", `project-${type}`, compact && "project-visual-compact")} aria-hidden="true">
      {type === "marketplace" ? <MarketplaceVisual variant={variant} /> : null}
      {type === "database" ? <DatabaseVisual variant={variant} /> : null}
      {type === "focus" ? <FocusVisual variant={variant} /> : null}
    </div>
  );
}
