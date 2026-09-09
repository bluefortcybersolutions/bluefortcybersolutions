/**
 * BlueFort Cyber Solutions - Interactive Security Scope & Posture Estimator
 * Provides pointwise customized descriptions based on the exact digital footprint and objective combination selected.
 * Each digital footprint pill has a unique, topic-specific contextual description.
 */

(function () {
  const assetPills = document.querySelectorAll('.asset-pill');
  const concernPills = document.querySelectorAll('.concern-pill');
  const resultTitle = document.getElementById('estimatorResultTitle');
  const resultDesc = document.getElementById('estimatorResultDesc');
  const resultList = document.getElementById('estimatorResultList');
  const estimatorCta = document.getElementById('estimatorCta');

  let selectedAsset = 'web-api';
  let selectedConcern = 'vapt';

  // =========================================================================
  // UNIQUE DIGITAL FOOTPRINT DESCRIPTIONS
  // Each option has a distinct, cybersecurity-specific description
  // =========================================================================
  const footprintDescriptions = {
    'web-api': {
      label: 'Web Applications & APIs',
      description: 'Your internet-facing web platforms, login portals, and API services represent the primary attack surface. This layer is most exposed to injection attacks, broken authentication, insecure direct object references, and business logic exploitation by external adversaries.'
    },
    'cloud': {
      label: 'Cloud Infrastructure (AWS/GCP/Azure)',
      description: 'Cloud environments introduce unique risks through misconfigured storage buckets, overly permissive IAM roles, exposed management APIs, and serverless functions. A single misconfiguration can grant attackers access to entire data lakes, credentials, or compute resources.'
    },
    'network': {
      label: 'Corporate Network & Servers',
      description: 'On-premise and hybrid networks face threats from perimeter breaches, unpatched server vulnerabilities, Active Directory privilege escalation, and lateral movement by attackers. Weak segmentation between subnets amplifies the blast radius of any single compromised machine.'
    },
    'workforce': {
      label: 'Remote Workforce & Endpoints',
      description: 'Distributed employees, laptops, mobile devices, and VPN endpoints create a wide human-and-device attack surface. Phishing, stolen credentials, malware infections, and unmanaged personal devices are the leading entry points for breaches targeting remote work environments.'
    }
  };

  // =========================================================================
  // DISPLAY FOOTPRINT DESCRIPTION BELOW PILL GROUP
  // =========================================================================
  function updateFootprintDescription(assetKey) {
    let descBox = document.getElementById('footprintDescBox');

    // Create the description box if it doesn't exist yet
    if (!descBox) {
      const pillGroup = document.querySelector('.asset-pill');
      if (!pillGroup) return;
      const pillGroupContainer = pillGroup.closest('.option-pill-group');
      if (!pillGroupContainer) return;

      descBox = document.createElement('div');
      descBox.id = 'footprintDescBox';
      descBox.style.cssText = [
        'margin-top: 0.85rem',
        'padding: 0.85rem 1.1rem',
        'background: rgba(6, 182, 212, 0.07)',
        'border: 1px solid rgba(56, 189, 248, 0.2)',
        'border-radius: 8px',
        'font-size: 0.88rem',
        'color: var(--text-secondary, #cbd5e1)',
        'line-height: 1.65',
        'transition: opacity 250ms ease'
      ].join(';');

      pillGroupContainer.parentNode.insertBefore(descBox, pillGroupContainer.nextSibling);
    }

    const data = footprintDescriptions[assetKey];
    if (data) {
      descBox.style.opacity = '0';
      setTimeout(function () {
        descBox.textContent = data.description;
        descBox.style.opacity = '1';
      }, 120);
    }
  }

  // Comprehensive matrix for footprint (asset) x objective (concern)
  const assessmentMatrix = {
    // 1. WEB APPLICATIONS & APIS
    'web-api': {
      'vapt': {
        title: 'Web Application & API Penetration Testing',
        serviceFormVal: 'VAPT',
        desc: 'Comprehensive manual and automated offensive testing targeting web application vulnerabilities, exposed API endpoints, and authentication logic.',
        points: [
          'Full OWASP Top 10 evaluation (SQL Injection, Cross-Site Scripting, CSRF, SSRF)',
          'Deep manual inspection of multi-step business logic and authorization bypasses',
          'API parameter tampering, Broken Object Level Authorization (BOLA), and rate-limit testing',
          'Actionable remediation guidance with reproducible Proof-of-Concept (PoC) steps'
        ]
      },
      'monitoring': {
        title: 'Web Application & API Security Monitoring (WAF & Telemetry)',
        serviceFormVal: 'SOC & Security Monitoring',
        desc: 'Continuous real-time visibility into incoming web traffic, malicious bot activity, credential stuffing, and application-layer attack spikes.',
        points: [
          'Real-time Web Application Firewall (WAF) rule tuning and threat telemetry analysis',
          'Automated alerting on anomalous API traffic patterns, scraping, and brute-force attempts',
          'False-positive filtering to prevent legitimate customer disruption during active defense',
          'Continuous monitoring of SSL/TLS certificate integrity and exposed web endpoints'
        ]
      },
      'incident': {
        title: 'Web Application Compromise & Data Leak Forensics',
        serviceFormVal: 'Cyber Forensics & Incident Response',
        desc: 'Targeted forensic analysis to determine if web applications or API databases were exploited, accessed without authorization, or exfiltrated.',
        points: [
          'Deep web server and access log reconstruction to identify initial vector of compromise',
          'Database query and payload artifact analysis to verify potential customer data leakage',
          'Immediate containment guidance to seal exploited web paths and invalidate exposed tokens',
          'Root Cause Analysis (RCA) report explaining how the attack occurred and preventative fixes'
        ]
      },
      'audit': {
        title: 'Application Security Architecture & API Risk Audit',
        serviceFormVal: 'Security Audit & Risk Assessment',
        desc: 'Structured evaluation of the entire software development security posture, token management, session handling, and API gateway configurations.',
        points: [
          'Architecture review of authentication, OAuth2/JWT token lifecycles, and session management',
          'Third-party dependency and open-source software supply chain vulnerability assessment',
          'API gateway configuration, CORS policy review, and sensitive data exposure analysis',
          'Prioritized executive roadmap for hardening digital application interfaces'
        ]
      },
      'human': {
        title: 'Secure Development & Application Security Awareness',
        serviceFormVal: 'Security Awareness & Consulting',
        desc: 'Empowering software engineering and product teams to integrate defensive coding principles and eliminate recurring software weaknesses.',
        points: [
          'Developer-focused workshops on OWASP vulnerabilities and secure coding standards',
          'Guidance on recognizing and mitigating logic flaws during sprint planning and code review',
          'Best practices for secure credential handling, API secret management, and git hygiene',
          'Strategic consultation on establishing an internal security champion program'
        ]
      }
    },

    // 2. CLOUD INFRASTRUCTURE (AWS / GCP / AZURE)
    'cloud': {
      'vapt': {
        title: 'Cloud Infrastructure & IAM Penetration Testing',
        serviceFormVal: 'VAPT',
        desc: 'Authorized security assessment targeting misconfigured cloud services, excessive IAM permissions, insecure storage buckets, and container clusters.',
        points: [
          'IAM role privilege escalation and permissive policy exploitation testing',
          'Testing security of exposed storage buckets (S3, Cloud Storage, Blob), databases, and serverless functions',
          'Kubernetes / Container escape scenarios and unauthorized cloud resource access tests',
          'Clear technical deliverables showing attack paths and minimal-privilege remediation guides'
        ]
      },
      'monitoring': {
        title: 'Cloud Threat Detection & Security Posture Monitoring',
        serviceFormVal: 'SOC & Security Monitoring',
        desc: 'Continuous monitoring of cloud audit logs, control plane activity, and unexpected workload behavior across multi-cloud environments.',
        points: [
          'Real-time ingestion and correlation of CloudTrail, Cloud Audit, and VPC flow logs',
          'Instant detection of unauthorized root/admin logins, unusual geolocation access, or compute spikes',
          'Continuous Cloud Security Posture Management (CSPM) alerts on newly exposed resources',
          'Structured escalation protocol for rapid threat containment in cloud environments'
        ]
      },
      'incident': {
        title: 'Cloud Breach Investigation & Key Compromise Forensics',
        serviceFormVal: 'Cyber Forensics & Incident Response',
        desc: 'Forensic reconstruction of compromised cloud credentials, unauthorized API executions, ransomware on virtual machines, or illicit cryptomining.',
        points: [
          'Timeline analysis of API key usage, IAM role assumption, and resource creation logs',
          'Cloud snapshot preservation and volatile memory analysis of affected virtual instances',
          'Identification of exfiltrated storage buckets or unauthorized database backups',
          'Step-by-step key revocation, IAM lockdown, and secure posture restoration roadmap'
        ]
      },
      'audit': {
        title: 'Comprehensive Cloud Architecture & CIS Benchmark Audit',
        serviceFormVal: 'Security Audit & Risk Assessment',
        desc: 'In-depth review of your entire cloud topology against CIS benchmarks, evaluating encryption, network zoning, and governance controls.',
        points: [
          'Verification of encryption-at-rest and in-transit across all cloud object stores and databases',
          'Audit of VPC peering, security groups, public IP exposure, and egress filtering rules',
          'Evaluation of IAM least-privilege enforcement and Multi-Factor Authentication (MFA) mandates',
          'Executive summary and technical remediation matrix categorized by risk rating'
        ]
      },
      'human': {
        title: 'Cloud Security Governance & DevOps Best Practice Advisory',
        serviceFormVal: 'Security Awareness & Consulting',
        desc: 'Guiding cloud administrators, DevOps engineers, and leadership on secure deployment practices and accidental credential exposure prevention.',
        points: [
          'Training on preventing accidental hardcoding of AWS/GCP API secrets in public repositories',
          'Guidance on Infrastructure-as-Code (IaC) security best practices (Terraform, CloudFormation)',
          'Clear processes for managing temporary credentials and principle-of-least-privilege access',
          'Consulting advisory on establishing automated guardrails and compliance baseline policies'
        ]
      }
    },

    // 3. CORPORATE NETWORK & SERVERS
    'network': {
      'vapt': {
        title: 'Internal & External Network Penetration Testing',
        serviceFormVal: 'VAPT',
        desc: 'Rigorous assessment of perimeter firewalls, exposed network ports, Active Directory security, and internal server segmentation.',
        points: [
          'External perimeter scan and manual exploit validation on public IP ranges and VPN gateways',
          'Internal Active Directory testing for Kerberoasting, AS-REP roasting, and privilege escalation',
          'Network segmentation testing between sensitive subnets (management, production, guest)',
          'Detailed vulnerability report with severity ratings (Critical to Low) and fix guidance'
        ]
      },
      'monitoring': {
        title: '24/7 Network Traffic & Server Event Monitoring',
        serviceFormVal: 'SOC & Security Monitoring',
        desc: 'Centralized log aggregation and threat hunting across firewalls, network switches, domain controllers, and mission-critical servers.',
        points: [
          'Continuous correlation of firewall traffic, DNS queries, and domain controller auth logs',
          'Anomaly detection for lateral movement, port scanning, and suspicious external beacons',
          'Rapid alert triage prioritizing high-risk indicators over harmless network noise',
          'Monthly visibility trends, threat intelligence matching, and bandwidth anomaly reporting'
        ]
      },
      'incident': {
        title: 'Network Intrusion & Ransomware Incident Response',
        serviceFormVal: 'Cyber Forensics & Incident Response',
        desc: 'Urgent containment and digital forensics for network intrusions, lateral malware spreading, ransomware threats, or domain compromise.',
        points: [
          'Immediate network segmentation guidance to isolate compromised host machines',
          'Forensic disk analysis and packet capture inspection to reconstruct the intruder pathway',
          'Identification of persistence mechanisms, scheduled tasks, and rogue administrative accounts',
          'Root Cause Analysis report with step-by-step guidance for secure network recovery'
        ]
      },
      'audit': {
        title: 'Corporate Network Architecture & Security Control Audit',
        serviceFormVal: 'Security Audit & Risk Assessment',
        desc: 'Full-spectrum review of internal and boundary network controls, server hardening standards, backup isolation, and patching processes.',
        points: [
          'Evaluation of firewall access control lists (ACLs), DMZ architectures, and wireless security',
          'Review of Active Directory Group Policies (GPO), password complexities, and privileged access',
          'Inspection of offline/immutable backup mechanisms against potential ransomware deletion',
          'Strategic security posture roadmap with prioritized timeline of network improvements'
        ]
      },
      'human': {
        title: 'Network Security Hygiene & Administrator Advisory',
        serviceFormVal: 'Security Awareness & Consulting',
        desc: 'Training IT support staff, network admins, and system administrators on defensive network hygiene and safe system maintenance.',
        points: [
          'Best practices for secure remote management (SSH, RDP) and administrative jump-host usage',
          'Training on secure network decommissioning, patch verification, and asset lifecycle tracking',
          'Clear guidelines on managing vendor access and third-party remote connection tunnels',
          'Advisory roadmap for adopting a defense-in-depth and Zero-Trust network architecture'
        ]
      }
    },

    // 4. REMOTE WORKFORCE & ENDPOINTS
    'workforce': {
      'vapt': {
        title: 'Endpoint Security & Remote Access Penetration Testing',
        serviceFormVal: 'VAPT',
        desc: 'Simulating attacker techniques targeting remote employee workstations, VPN endpoints, mobile devices, and SaaS identity portals.',
        points: [
          'Evaluation of remote employee VPN and Single Sign-On (SSO) authentication security',
          'Testing endpoint detection response bypasses and local privilege escalation vulnerabilities',
          'Assessment of device encryption, USB autorun restrictions, and local admin permission controls',
          'Actionable recommendations to harden employee laptops against initial access malware'
        ]
      },
      'monitoring': {
        title: 'Endpoint Detection & Response (EDR) Monitoring',
        serviceFormVal: 'SOC & Security Monitoring',
        desc: 'Continuous monitoring of workforce endpoint telemetry to catch malware, suspicious powershell execution, and credential theft attempts.',
        points: [
          'Real-time behavioral monitoring for ransomware execution, keyloggers, and infostealers',
          'Detection of suspicious logins from unusual countries or concurrent conflicting locations',
          'Triage and isolation of infected employee laptops remotely before lateral spread occurs',
          'Comprehensive monthly endpoint health, patch compliance, and threat activity reporting'
        ]
      },
      'incident': {
        title: 'Stolen Device & Employee Compromise Forensics',
        serviceFormVal: 'Cyber Forensics & Incident Response',
        desc: 'Fast digital investigation for lost/stolen hardware, compromised employee credentials, malware infections, or suspected data leakage.',
        points: [
          'Remote volatile memory extraction and malware artifact triage on affected laptops',
          'Investigation of employee email logs and cloud session tokens for unauthorized downloads',
          'Immediate guidance on session revocation, credential reset, and remote device wiping',
          'Post-incident report detailing data exposure risk and preventative hardening measures'
        ]
      },
      'audit': {
        title: 'Workforce Security Policy & Endpoint Posture Audit',
        serviceFormVal: 'Security Audit & Risk Assessment',
        desc: 'Holistic review of Mobile Device Management (MDM), Bring-Your-Own-Device (BYOD) policies, data loss prevention, and remote work guidelines.',
        points: [
          'Review of MDM enforcement (disk encryption, password complexity, automatic screen locks)',
          'Assessment of Data Loss Prevention (DLP) controls across email, cloud drives, and chat apps',
          'Evaluation of employee onboarding and offboarding access revocation workflows',
          'Comprehensive audit report outlining policy improvements and human-risk mitigation steps'
        ]
      },
      'human': {
        title: 'Employee Phishing Simulation & Security Awareness Training',
        serviceFormVal: 'Security Awareness & Consulting',
        desc: 'Transforming employees into a human firewall with practical training on phishing, social engineering, password security, and safe remote work.',
        points: [
          'Simulated phishing campaigns testing employee alertness against modern deceptive emails',
          'Interactive training on recognizing vishing, CEO fraud, invoice scams, and fake tech support',
          'Education on secure password management, multi-factor authentication, and safe Wi-Fi usage',
          'Establishing a blameless reporting culture with step-by-step incident reporting checklists'
        ]
      }
    }
  };

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function updateEstimator() {
    const assetData = assessmentMatrix[selectedAsset] || assessmentMatrix['web-api'];
    const rec = assetData[selectedConcern] || assetData['vapt'];

    if (resultTitle) resultTitle.textContent = rec.title;
    if (resultDesc) resultDesc.textContent = rec.desc;

    if (resultList) {
      resultList.innerHTML = rec.points
        .map(function (point) {
          return `
          <li class="result-rec-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--cyan-400); flex-shrink:0; margin-top:0.2rem;">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>${escapeHtml(point)}</span>
          </li>`;
        })
        .join('');
    }

    if (estimatorCta) {
      estimatorCta.setAttribute('data-target-service', rec.serviceFormVal);
    }
  }

  // Bind Asset Selection Pills — update estimator AND show footprint description
  assetPills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      assetPills.forEach(function (p) {
        p.classList.remove('selected');
      });
      this.classList.add('selected');
      selectedAsset = this.getAttribute('data-asset');
      updateEstimator();
      updateFootprintDescription(selectedAsset);
    });
  });

  // Show description for the default selected asset on page load
  updateFootprintDescription(selectedAsset);

  // Bind Concern Selection Pills
  concernPills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      concernPills.forEach(function (p) {
        p.classList.remove('selected');
      });
      this.classList.add('selected');
      selectedConcern = this.getAttribute('data-concern');
      updateEstimator();
    });
  });

  // Bind Estimator CTA Button
  if (estimatorCta) {
    estimatorCta.addEventListener('click', function () {
      const targetService = this.getAttribute('data-target-service');
      
      // If contact section is on the same page
      const serviceSelect = document.getElementById('serviceRequired');
      const contactSection = document.getElementById('contact');
      
      if (serviceSelect && contactSection) {
        serviceSelect.value = targetService;
        contactSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(function () {
          const nameInput = document.getElementById('fullName');
          if (nameInput) nameInput.focus();
        }, 550);
      } else {
        // Multi-page navigation: redirect to contact.html with pre-selected service
        window.location.href = `contact.html?service=${encodeURIComponent(targetService)}`;
      }
    });
  }

  // Initial render on page load
  updateEstimator();
})();
