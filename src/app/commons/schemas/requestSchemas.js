const headers = {
  $id: "request-headers",
  type: "object",
  required: ["x-channel-id"],
  properties: {
    Authorization: { type: "string" },
    "x-channel-id": {
      type: "string",
      default: "WEB",
      enum: ["AND", "WEB", "STORE", "IOS"],
      description: "Example values: 'APP'"
    }
  }
};

const auditSchema = {
  $id: "request-audit",
  type: "object",
  additionalProperties: false,
  properties: {
    api_version: { type: "string" },
    created_by: { type: "string" },
    created_at: { type: "string", format: "date-time" },
    updated_by: { type: "string" },
    updated_at: { type: "string", format: "date-time" }
  }
};

const customInfo = {
  $id: "request-custom-info",
  type: "array",
  items: {
    type: "object",
    additionalProperties: false,
    properties: {
      group: { type: "string" },
      id: { type: "string" },
      values: { type: "array", items: { type: "string" } },
      additional_info: { type: "object" }
    }
  }
};

const allowedChannel = {
  $id: "request-allowed-channel",
  type: "string",
  enum: ["ONLINE", "STORE", "OMNI"],
  default: "OMNI"
};

const quantity = {
  $id: "response-quantity",
  type: "object",
  properties: {
    quantity_number: { type: "integer" },
    quantity_uom: { type: "string" }
  }
};

exports.commonRequestSchemas = [
  auditSchema,
  headers,
  customInfo,
  allowedChannel,
  quantity
];
