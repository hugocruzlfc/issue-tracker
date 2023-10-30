import { useState } from "react";
import { IssuesList, LabelList, StatusSelected } from "../components";
import { Link } from "react-router-dom";

export default function Issues() {
  const [labels, setLabels] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("");

  return (
    <div>
      <main>
        <section>
          <h1>Issues</h1>
          <IssuesList
            labels={labels}
            status={status}
          />
        </section>
        <aside>
          <LabelList
            selected={labels}
            toggleLabel={(label: string) =>
              setLabels((currentLabels) =>
                currentLabels.includes(label)
                  ? currentLabels.filter((l) => l !== label)
                  : [...currentLabels, label]
              )
            }
          />
          <h3>Status</h3>
          <StatusSelected
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          />
          <hr />
          <Link
            className="button"
            to="/add"
          >
            Add Issue
          </Link>
        </aside>
      </main>
    </div>
  );
}
