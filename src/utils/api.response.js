function success(message, data = null, meta = null) {
  const response = { success: true, message, data };
  if (meta) response.meta = meta;
  return response;
}

function error(message, errors = null, meta = null) {
  const response = { success: false, message, errors };
  if (meta) response.meta = meta;
  return response;
}

function formatZodErrors(zodError) {
  if (!zodError.issues) return null;
  return zodError.issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));
}

export { success, error, formatZodErrors };
