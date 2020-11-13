export const StatusCssClasses = ["danger", "success", "info", ""];
export const StatusTitles = ["Suspended", "Active", "Pending", ""];
export const TypeCssClasses = ["success", "primary", ""];
export const TypeTitles = ["Business", "Individual", ""];
export const defaultSorted = [{ dataField: "ADMI_IN_CODIGO", order: "asc" }];
export const sizePerPageList = [
  { text: "3", value: 3 },
  { text: "5", value: 5 },
  { text: "10", value: 10 }
];
export const initialFilter = {
  filter: {
    nombres:"",
  },
  sortOrder: "asc", // asc||desc
  sortField: "USER_IN_CODIGO",
  pageNumber: 1,
  pageSize: 10,
};
