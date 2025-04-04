import React from "react";
import { AccomplishmentStoryDetail } from "../types";

type Props = AccomplishmentStoryDetail;

export function AccomplishmentStory({ details, name, tags }: Props) {
  return (
    <div>
      <p>
        <strong>Situation:</strong> {details.situation}
      </p>
      <p>
        <strong>Task:</strong> {details.task}
      </p>
      <p>
        <strong>Action:</strong> {details.action}
      </p>
      <p>
        <strong>Result:</strong> {details.result}
      </p>
      {tags && (
        <div className="tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
