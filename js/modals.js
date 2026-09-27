/**
 * BlueFort Cyber Solutions - Service Detail Modal System
 * Complete structured datasets, accessible focus trap, keyboard navigation, and seamless contact binding.
 */

(function () {
  const serviceDatabase = {
    vapt: {
      id: 'vapt',
      title: 'Vulnerability Assessment & Penetration Testing (VAPT)',
      category: 'Proactive Offensive Security',
      formValue: 'VAPT',
      ctaText: 'Request a VAPT Assessment',
      description:
        "We provide comprehensive security testing to identify and validate vulnerabilities that could affect your organization's systems, applications, and digital services. Our approach combines automated security assessment with manual testing to provide more meaningful and reliable security findings.",
      sections: [
        {
          title: 'Our Testing Approach',
          type: 'features',
          items: [
            {
              title: 'Automated Assessment',
              desc: 'Use security assessment techniques to identify potential vulnerabilities, security misconfigurations, exposed services, and known weaknesses.'
            },
            {
              title: 'Manual Security Testing',
              desc: 'Manually validate security findings and assess authorized attack scenarios. Manual testing helps identify complex vulnerabilities that automated tools may not detect.'
            }
          ]
        },
        {
          title: 'Areas We Assess',
          type: 'tags',
          items: [
            'Web Applications',
            'APIs & Endpoints',
            'Authentication Systems',
            'Authorization & RBAC',
            'Input Validation',
            'Session Management',
            'Security Misconfiguration',
            'Exposed Services',
            'OWASP-related Security Risks',
            'Business Logic Flaws'
          ]
        },
        {
          title: 'Professional Deliverables for Validated Findings',
          type: 'deliverables',
          items: [
            {
              name: 'Issue Name & Classification',
              desc: 'Clear vulnerability or security issue name categorized by industry standards.'
            },
            {
              name: 'Severity Rating',
              desc: 'Classified strictly as Critical, High, Medium, Low, or Informational.'
            },
            {
              name: 'Affected URL & Target Asset',
              desc: 'Explicit documentation of the affected URL, asset, application, or endpoint.'
            },
            {
              name: 'Vulnerable Path & Endpoint',
              desc: 'Detailed path, page, parameter, or functionality where the issue exists.'
            },
            {
              name: 'Proof of Concept (PoC)',
              desc: 'Clear, reproducible evidence demonstrating the identified issue within authorized scope.'
            },
            {
              name: 'Proof Video (Where Permitted)',
              desc: 'Recorded video evidence where appropriate to assist engineering and dev teams.'
            },
            {
              name: 'Technical Root-Cause Description',
              desc: 'In-depth explanation of how and why the security issue exists in the application logic.'
            },
            {
              name: 'Business Impact Analysis',
              desc: 'Clear business implications including data exposure, account takeover, disruption, or financial impact.'
            },
            {
              name: 'Remediation Guidance',
              desc: 'Actionable code, architecture, and configuration fixes tailored to your stack.'
            },
            {
              name: 'Executive & Technical Security Report',
              desc: 'Comprehensive final report with executive summary, methodology, evidence, and remediation roadmaps.'
            }
          ]
        }
      ]
    },

    soc: {
      id: 'soc',
      title: 'SOC & Security Monitoring',
      category: 'Continuous Defensive Visibility',
      formValue: 'SOC & Security Monitoring',
      ctaText: 'Improve Your Security Monitoring',
      description:
        'Our SOC and Security Monitoring services help organizations gain better visibility into security events and suspicious activity. We support security monitoring, alert analysis, investigation, and incident triage to help identify potential threats early.',
      sections: [
        {
          title: 'What We Provide',
          type: 'features',
          items: [
            {
              title: 'Security Event Monitoring',
              desc: 'Monitor relevant security events across authorized systems and security tools.'
            },
            {
              title: 'Log Monitoring and Analysis',
              desc: 'Analyze security logs to identify suspicious patterns, anomalies, and potential threats.'
            },
            {
              title: 'Alert Investigation',
              desc: 'Review security alerts and determine whether they represent false positives, suspicious activity, or potential security incidents.'
            },
            {
              title: 'Threat Detection',
              desc: 'Identify suspicious activity and potential indicators of compromise across assets.'
            },
            {
              title: 'Security Incident Triage',
              desc: 'Prioritize alerts based on threat severity and real-world business impact.'
            },
            {
              title: 'Escalation Support',
              desc: 'Provide clear, structured escalation information when an event requires immediate action.'
            },
            {
              title: 'Threat Hunting Support',
              desc: 'Proactively investigate security information to uncover suspicious activity that automated alerts miss.'
            }
          ]
        },
        {
          title: 'Monitoring Sources (Where Applicable)',
          type: 'tags',
          items: [
            'Production Servers',
            'Workstations & Endpoints',
            'Next-Gen Firewalls',
            'Network Devices & Gateways',
            'Authentication Systems & IAM',
            'Cloud Environments (AWS / GCP / Azure)',
            'Security Tools & EDR',
            'Application & Database Logs'
          ]
        },
        {
          title: 'Client Deliverables',
          type: 'deliverables',
          items: [
            { name: 'Security Alerts & Notifications', desc: 'Real-time structured alerts for validated suspicious activity.' },
            { name: 'Incident Details & Telemetry', desc: 'Deep contextual data on source IPs, timestamps, and impacted assets.' },
            { name: 'Investigation Summary', desc: 'Concise review explaining findings and incident context.' },
            { name: 'IOC Information', desc: 'Documented Indicators of Compromise (hashes, IPs, malicious domains).' },
            { name: 'Recommended Actions', desc: 'Specific immediate containment and remediation guidance.' },
            { name: 'Monitoring Reports', desc: 'Regular summaries of monitored events, noise reduction, and alerts.' },
            { name: 'Security Trend Analysis', desc: 'Quarterly visibility trends and organizational threat landscape reviews.' }
          ]
        }
      ]
    },

    forensics: {
      id: 'forensics',
      title: 'Cyber Forensics & Incident Response',
      category: 'Emergency Investigation & Rapid Response',
      formValue: 'Cyber Forensics & Incident Response',
      ctaText: 'Request Incident Response Support',
      description:
        'Our Cyber Forensics and Incident Response services help organizations investigate suspected cybersecurity incidents, analyze available evidence, understand what happened, and support response and recovery activities.',
      sections: [
        {
          title: 'What We Provide',
          type: 'features',
          items: [
            {
              title: 'Incident Investigation',
              desc: 'Investigate suspected security incidents within the authorized scope with high rigor.'
            },
            {
              title: 'Digital Evidence Analysis',
              desc: 'Analyze relevant digital evidence, disk artifacts, memory, files, logs, and system information.'
            },
            {
              title: 'Log Analysis',
              desc: 'Review security, authentication, and system logs to reconstruct suspicious activity.'
            },
            {
              title: 'Compromise Assessment',
              desc: 'Determine whether systems show indicators of unauthorized access, lateral movement, or data exfiltration.'
            },
            {
              title: 'Incident Timeline',
              desc: 'Create an exact chronological timeline showing important security events and threat actor actions.'
            },
            {
              title: 'Malware Investigation Support',
              desc: 'Analyze suspicious binaries, scripts, or malware-related payloads where applicable.'
            },
            {
              title: 'Evidence Documentation',
              desc: 'Preserve and document findings with proper chain-of-custody protocols.'
            },
            {
              title: 'Containment Guidance',
              desc: 'Provide immediate technical steps to isolate threat vectors and contain active incidents.'
            },
            {
              title: 'Recovery Support',
              desc: 'Guide safe system restoration, credential invalidation, and prevention of recurrence.'
            }
          ]
        },
        {
          title: 'Client Deliverables',
          type: 'deliverables',
          items: [
            { name: 'Executive Incident Summary', desc: 'High-level executive briefing on the incident scope and resolution.' },
            { name: 'Affected Assets & Scope Ledger', desc: 'Complete inventory of impacted endpoints, servers, and data stores.' },
            { name: 'Chronological Incident Timeline', desc: 'Detailed event-by-event timeline from initial access to containment.' },
            { name: 'Evidence Summary & Artifacts', desc: 'Summary of preserved digital forensic evidence and findings.' },
            { name: 'Impact Assessment', desc: 'Analysis of data exposure risk, regulatory scope, and business disruption.' },
            { name: 'Investigation Findings', desc: 'Comprehensive technical breakdown of attacker techniques and tactics.' },
            { name: 'Root Cause Analysis (RCA)', desc: 'Identification of the underlying gap or vulnerability exploited.' },
            { name: 'Incident Response Final Report', desc: 'Full formal post-incident documentation.' },
            { name: 'Post-Incident Security Recommendations', desc: 'Hardening roadmap to prevent future identical attacks.' }
          ]
        }
      ]
    },

    audit: {
      id: 'audit',
      title: 'Security Audit & Risk Assessment',
      category: 'Governance & Posture Evaluation',
      formValue: 'Security Audit & Risk Assessment',
      ctaText: 'Request a Security Audit',
      description:
        "Our Security Audit and Risk Assessment services help organizations identify cybersecurity gaps and understand which risks require priority attention. We evaluate relevant security controls, configurations, assets, and processes to provide a clearer view of the organization's security posture.",
      sections: [
        {
          title: 'What We Assess',
          type: 'features',
          items: [
            {
              title: 'Security Controls',
              desc: 'Review relevant technical and administrative security controls to identify weaknesses.'
            },
            {
              title: 'Infrastructure Security',
              desc: 'Assess relevant servers, networks, systems, cloud instances, and perimeter configurations.'
            },
            {
              title: 'Access Control & IAM',
              desc: 'Review authentication, authorization, privilege separation, and MFA enforcement.'
            },
            {
              title: 'Security Configuration',
              desc: 'Identify potentially insecure configurations, default credentials, and unpatched assets.'
            },
            {
              title: 'Asset Exposure & Attack Surface',
              desc: 'Review internet-exposed assets, open ports, and DNS hygiene.'
            },
            {
              title: 'Application Security Controls',
              desc: 'Assess security hygiene across core business applications and data endpoints.'
            },
            {
              title: 'Policies and Processes',
              desc: 'Review existing security procedures, backup strategies, and incident policies.'
            },
            {
              title: 'Risk Identification',
              desc: 'Systematically identify organizational cybersecurity risks relevant to your operations.'
            }
          ]
        },
        {
          title: 'Our 4-Step Risk Assessment Process',
          type: 'features',
          items: [
            { title: '1. Identify', desc: 'Identify critical assets, potential threats, and existing security gaps.' },
            { title: '2. Analyze', desc: 'Evaluate likelihood of exploitation and estimate potential operational/financial impact.' },
            { title: '3. Prioritize', desc: 'Rank risks objectively based on severity and business importance.' },
            { title: '4. Recommend', desc: 'Provide practical, cost-effective steps for remediating identified risks.' }
          ]
        },
        {
          title: 'Client Deliverables',
          type: 'deliverables',
          items: [
            { name: 'Comprehensive Security Findings', desc: 'Detailed catalog of identified gaps, misconfigurations, and weaknesses.' },
            { name: 'Risk Ratings Matrix', desc: 'Standardized qualitative and quantitative risk scores.' },
            { name: 'Business Impact Analysis', desc: 'Contextual explanation of how each risk affects operations and reputation.' },
            { name: 'Risk Prioritization Matrix', desc: 'Actionable categorization from immediate priorities to long-term goals.' },
            { name: 'Executive Summary', desc: 'Clear, concise briefing tailored for executive leadership and boards.' },
            { name: 'Security Improvement Roadmap', desc: 'Step-by-step phased roadmap to elevate security posture.' },
            { name: 'Detailed Security Audit Report', desc: 'Full technical reference document with all evidence and testing notes.' }
          ]
        }
      ]
    },

    awareness: {
      id: 'awareness',
      title: 'Security Awareness & Consulting',
      category: 'Human Risk & Strategic Advisory',
      formValue: 'Security Awareness & Consulting',
      ctaText: 'Strengthen Your Security Culture',
      description:
        'Technology alone cannot prevent every cyberattack. Employees, management, processes, and security decisions are also critical parts of cybersecurity. Our Security Awareness and Consulting services help organizations improve cybersecurity knowledge and make practical security improvements.',
      sections: [
        {
          title: 'Security Awareness Topics',
          type: 'features',
          items: [
            {
              title: 'Phishing Awareness',
              desc: 'Teach employees how to recognize suspicious emails, malicious links, deceptive attachments, and impersonation attempts.'
            },
            {
              title: 'Password & Credential Security',
              desc: 'Provide guidance on secure passphrase generation, password managers, and multi-factor authentication.'
            },
            {
              title: 'Social Engineering Defense',
              desc: 'Educate teams on psychological manipulation, pretexting, and phone/vishing impersonation tactics.'
            },
            {
              title: 'Safe Internet Practices',
              desc: 'Promote secure web browsing, safe downloading, verified software sources, and secure communication.'
            },
            {
              title: 'Device & Endpoint Security',
              desc: 'Provide best practices for securing laptops, mobile devices, screen locks, and USB handling.'
            },
            {
              title: 'Remote & Hybrid Work Security',
              desc: 'Educate distributed teams on Wi-Fi security, VPN usage, and home office data confidentiality.'
            },
            {
              title: 'Prompt Incident Reporting',
              desc: 'Establish a blameless reporting culture so employees report suspicious activities immediately.'
            }
          ]
        },
        {
          title: 'Cybersecurity Consulting Advisory',
          type: 'features',
          items: [
            {
              title: 'Security Strategy',
              desc: 'Help executive leadership understand cybersecurity priorities and strategic investments.'
            },
            {
              title: 'Security Best Practices',
              desc: 'Provide actionable recommendations for hardening day-to-day organizational workflows.'
            },
            {
              title: 'Risk Reduction Plans',
              desc: 'Tailor specific risk mitigation plans aligned with business growth goals.'
            },
            {
              title: 'Security Roadmap',
              desc: 'Assist teams in structuring short-term quick wins and sustainable long-term defenses.'
            },
            {
              title: 'Tailored Security Guidance',
              desc: 'Provide on-demand expert consultation based on unique organizational requirements.'
            }
          ]
        },
        {
          title: 'Client Deliverables',
          type: 'deliverables',
          items: [
            { name: 'Security Awareness Materials', desc: 'Practical checklists, guides, and presentation materials for staff.' },
            { name: 'Employee Training Guidance', desc: 'Structured training outlines and recommendations for recurring education.' },
            { name: 'Security Recommendations Brief', desc: 'Clear guidelines on procedural and policy enhancements.' },
            { name: 'Risk Reduction Action Plan', desc: 'Practical plan targeting human-factor and procedural vulnerabilities.' },
            { name: 'Security Improvement Roadmap', desc: 'Phased milestones for building a resilient security culture.' },
            { name: 'Consulting Summary & Recommendations', desc: 'Executive recap of consulting findings and strategic suggestions.' }
          ]
        }
      ]
    }
  };

  const overlay = document.getElementById('serviceModalOverlay');
  const dialog = document.getElementById('serviceModalDialog');
  const modalBadge = document.getElementById('modalServiceBadge');
  const modalTitle = document.getElementById('modalServiceTitle');
  const modalBody = document.getElementById('modalServiceBody');
  const modalCtaBtn = document.getElementById('modalCtaBtn');
  const closeBtn = document.getElementById('modalCloseBtn');

  let previousActiveElement = null;

  function renderModalContent(service) {
    if (!service) return;

    modalBadge.textContent = service.category;
    modalTitle.textContent = service.title;
    modalCtaBtn.textContent = service.ctaText;
    modalCtaBtn.setAttribute('data-service-target', service.formValue);

    let html = `
      <div class="modal-desc-box">
        ${service.description}
      </div>
    `;

    // If VAPT, render explicit severity tags box
    if (service.id === 'vapt') {
      html += `
        <div>
          <h4 class="modal-section-title">
            <svg class="modal-section-title-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
            Finding Severity Standard
          </h4>
          <p style="font-size:0.88rem; color:var(--text-muted); margin-bottom:0.75rem;">All validated vulnerabilities are classified using standardized severity tiers:</p>
          <div class="severity-showcase">
            <span class="badge badge-critical">Critical Severity</span>
            <span class="badge badge-high">High Severity</span>
            <span class="badge badge-medium">Medium Severity</span>
            <span class="badge badge-low">Low Severity</span>
            <span class="badge badge-info">Informational</span>
          </div>
        </div>
      `;
    }

    service.sections.forEach(function (section) {
      html += `
        <div>
          <h4 class="modal-section-title">
            <svg class="modal-section-title-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            ${section.title}
          </h4>
      `;

      if (section.type === 'features') {
        html += `<div class="modal-features-grid">`;
        section.items.forEach(function (item) {
          html += `
            <div class="modal-feature-card">
              <div class="modal-feature-title">${item.title}</div>
              <div class="modal-feature-desc">${item.desc}</div>
            </div>
          `;
        });
        html += `</div>`;
      } else if (section.type === 'tags') {
        html += `<div class="modal-tags-list">`;
        section.items.forEach(function (tag) {
          html += `<span class="modal-tag">${tag}</span>`;
        });
        html += `</div>`;
      } else if (section.type === 'deliverables') {
        html += `<div class="deliverables-grid">`;
        section.items.forEach(function (item) {
          html += `
            <div class="deliverable-item">
              <div class="deliverable-header">
                <span class="deliverable-name">${item.name}</span>
              </div>
              <span class="deliverable-desc">${item.desc}</span>
            </div>
          `;
        });
        html += `</div>`;
      }

      html += `</div>`;
    });

    modalBody.innerHTML = html;
    modalBody.scrollTop = 0;
  }

  function openModal(serviceKey) {
    const service = serviceDatabase[serviceKey];
    if (!service) return;

    previousActiveElement = document.activeElement;
    renderModalContent(service);

    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    // Focus close button
    setTimeout(function () {
      closeBtn.focus();
    }, 50);
  }

  function closeModal() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');

    if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
      previousActiveElement.focus();
    }
  }

  // Bind service card triggers
  document.querySelectorAll('[data-service-key]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      const serviceKey = this.getAttribute('data-service-key');
      openModal(serviceKey);
    });
  });

  // Close handlers
  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Modal CTA Handler: Preselect contact service & scroll or redirect
  modalCtaBtn.addEventListener('click', function () {
    const targetService = this.getAttribute('data-service-target');
    closeModal();

    const serviceSelect = document.getElementById('serviceRequired');
    const contactSection = document.getElementById('contact');

    if (serviceSelect && contactSection) {
      serviceSelect.value = targetService;
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(function () {
        const nameInput = document.getElementById('fullName');
        if (nameInput) nameInput.focus();
      }, 500);
    } else {
      window.location.href = `contact.html?service=${encodeURIComponent(targetService || '')}`;
    }
  });

  // Expose globally for footer or deep links
  window.BlueFortModals = {
    open: openModal,
    close: closeModal
  };
})();
