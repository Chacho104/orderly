"use client";

import { useParams } from "next/navigation";

import { useOrigin } from "@/hooks/useOrigin";

import { ApiAlert } from "./api-alert";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

export const ApiList: React.FC<ApiListProps> = ({
  entityName,
  entityIdName,
}) => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params?.storeId}`;
  return (
    <>
      <div className="pt-6">
        <ApiAlert
          title="GET"
          variant="public"
          description={`${baseUrl}/${entityName}`}
        />
      </div>
      <div className="pt-6">
        <ApiAlert
          title="GET"
          variant="public"
          description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        />
      </div>
      <div className="pt-6">
        <ApiAlert
          title="POST"
          variant="admin"
          description={`${baseUrl}/${entityName}`}
        />
      </div>
      <div className="pt-6">
        <ApiAlert
          title="PATCH"
          variant="admin"
          description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        />
      </div>
      <div className="pb-10 pt-6">
        <ApiAlert
          title="DELETE"
          variant="admin"
          description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        />
      </div>
    </>
  );
};
