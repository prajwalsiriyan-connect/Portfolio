
import "./InfraManage.css";
import { Link } from "react-router-dom";
import { ArrowLeft, CloudCog } from "lucide-react";
import InfrastructureAnimation from "../animations/InfrastructureAnimation";

function InfraManage() {
  return (
    <main
      className="inframanage-page"
      style={{
        position: "relative",
        zIndex: 100,
        minHeight: "100vh",
        color: "#F5F1FF",
        padding: "110px 6% 80px",
        boxSizing: "border-box",
      }}
    >
      <Link to="/" className="infra-back-link">
        <ArrowLeft size={18} />
        Back to Portfolio
      </Link>

      <section className="infra-project-hero">
        <span className="infra-page-status">
          <span className="status-dot" />
          Currently in Development
        </span>

        <div className="infra-page-icon">
          <CloudCog size={42} />
        </div>

        <p className="infra-eyebrow">
          CLOUD INFRASTRUCTURE PROJECT
        </p>

        <h1>InfraManage</h1>

        <h2>Cloud Infrastructure Management</h2>

        <p className="infra-page-description">
          An independent platform for monitoring and managing
          AWS EC2 infrastructure, with a focus on security,
          operational visibility and system reliability.
        </p>

        <div className="infra-page-tags">
          <span>Python</span>
          <span>AWS EC2</span>
          <span>Linux</span>
          <span>Monitoring</span>
        </div>
      </section>

      {/* 3D Infrastructure Environment */}

      <section className="infra-visual-section">
        <div className="infra-visual-heading">
          <p className="infra-eyebrow">
            INFRASTRUCTURE VISUALIZATION
          </p>

          <h2>
            One control plane. Connected infrastructure.
          </h2>

          <p>
            An animated representation of how infrastructure
            instances connect, exchange monitoring signals and
            communicate with the central management platform.
          </p>
        </div>

        <InfrastructureAnimation />

        <div className="infra-visual-legend">
          <span>EC2 Instances</span>
          <span>Monitoring</span>
          <span>Storage</span>
          <span>Security</span>
          <span>Linux Agents</span>
        </div>
      </section>

      {/* Development status */}

      <div className="infra-coming-soon">
        <CloudCog size={24} />

        <div>
          <h3>Something is being built.</h3>
          <p>
            The infrastructure is taking shape. More technical
            details and development updates will appear here
            as the project progresses.
          </p>
        </div>
      </div>
    </main>
  );
}

export default InfraManage;
