/**
 * Copyright 2022 Workgrid Software
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import { useQuery, gql } from "@apollo/client";
import Microapp from "./Microapp";
import Loader from "./Loader";

// GraphQL Query for list of microapps
const GET_MICROAPPS_QUERY = gql`
  query GetMicroapps($spaceId: ID!) {
    me {
      space(spaceId: $spaceId) {
        id
        apps {
          edges {
            cursor
            node {
              title
              entrypoint
            }
          }
        }
      }
    }
  }
`;

export default function Microapps() {
  // GraphQL Query hook to automatically fetch data
  const { data, loading, error } = useQuery(GET_MICROAPPS_QUERY, {
    variables: { spaceId: process.env.REACT_APP_SPACE_ID }
  });

  // Content is not ready, show error/loader
  if (loading) return <Loader />;
  if (error) return <pre>{error.message}</pre>;

  return (
    // <div
    //   style={{
    //     backgroundImage: "url(/example.png)",
    //     backgroundAttachment: "fixed",
    //     backgroundSize: "contain"
    //   }}
    // >
    <>
      {data.me.space.apps.edges?.map((edge) => (
        <Microapp {...edge} />
      ))}
    </>
    // </div>
  );
}
