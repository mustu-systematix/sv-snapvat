import moment from "moment";

export const RETURN_STATUSES = {
    APPROVE: "approved",
    PENDING: "pending",
    REJECT: "declined",
    ASSIGNED: "assigned",
    FILED: "filed",
    REVIEW: "review",
};

/**
 * @description Function to format date
 * @returns {date}
 */
export const formatDate = (oldDate) => {
    const d2 = moment(oldDate, "YYYY-MM-DD");
    const newDate = moment(d2).format("DD MMM YYYY");
    return `${newDate}`;
};

/** Currency formatter for AED */
export const currencyFormaterAED = (amount, isSymbolRequired, forTesting) => {
    if (
        amount ||
        amount != 0 ||
        amount != "" ||
        amount != 0.0 ||
        amount != "0.00"
    ) {
        try {
            let decimalCount = 2,
                decimal = ".",
                thousands = ",";
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

            const negativeSign = amount < 0 ? "-" : "";

            let i = parseInt(
                (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
            ).toString();
            let j = i.length > 3 ? i.length % 3 : 0;

            const res =
                negativeSign +
                (j ? i.substr(0, j) + thousands : "") +
                i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
                (decimalCount
                    ? decimal +
                    Math.abs(amount - i)
                        .toFixed(decimalCount)
                        .slice(2)
                    : "");
            if (isSymbolRequired) return `AED ${res}`;
            else return res;
        } catch (e) { }
    } else {
        if (isSymbolRequired) return `AED 0.00`;
        else return "0.00";
    }
};


/**
 * Get status object by id
 * @param statusId
 * @returns {object}
 */
export const getStatusName = (statusId) => {
    if (
        statusId === RETURN_STATUSES.PENDING ||
        statusId === RETURN_STATUSES.FILED ||
        statusId === RETURN_STATUSES.REJECT ||
        statusId === RETURN_STATUSES.REVIEW
    ) {
        statusId = statusId;
    } else {
        statusId =
            typeof statusId === "string" && statusId !== "All"
                ? parseInt(statusId)
                : statusId;
    }

    switch (statusId) {
        case "All":
            return {
                name: "",
                color: "black",
            };
        case 0:
            return {
                name: "Inactive",
                color: "#773d00",
            };
        case 1:
        case 4:
        case 9:
            return {
                name: "Draft",
                color: "#FEC827",
            };

        case RETURN_STATUSES.REVIEW:
            return {
                name: "Review",
                color: "#FEC827",
            };
        case 2:
            return {
                name: "Active",
                color: "#8BC63E",
            };
        case 5:
        case 10:
        case 21:
            return {
                name: "Cancelled",
                color: "#ed332c",
            };
        case RETURN_STATUSES.REJECT:
            return {
                name: "Rejected",
                color: "#ed332c",
            };
        case 6:
        case 3:
        case 11:
            return {
                name: "Approved",
                color: "#8BC63E",
            };
        case 12:
        case 7:
        case 20:
        case RETURN_STATUSES.FILED:
            return {
                name: "Files",
                color: "#283890",
            };
        case 15:
            return {
                name: "incomplete",
                color: "#773d00",
            };
        case 17:
        case 18:
        case 19:
        case RETURN_STATUSES.PENDING:
            return {
                name: "pending",
                color: "#773d00",
            };
        case 22:
        case 23:
        case 24:
            return {
                name: "Ommitted",
                color: "grey"
            }
        default:
            return {
                name: "NA",
                color: "grey",
            };
    }
};

/**
 * @description Get name with elipses
 * @param name, nameLength
 * @returns {string}
 */
export const checkNameForElipses = (name, nameLength) => {
    let slicedName = "";
    if (name && name.length > nameLength) {
        slicedName = name.slice(0, nameLength) + "...";
    } else {
        slicedName = name;
    }
    return slicedName;
};


/**
 * @method sortingAnArrayOfObject
 * @description sorted array of object
 * @param { arr1, arr2, byId }
 * @return {sorted array}
 */
export const sortingAnArrayOfObject = (arr1, arr2, byId) => {
    let genreA = "";
    let genreB = "";
    let comparison = 0;
    if (byId) {
      genreA = arr1.id;
      genreB = arr2.id;
      if (genreA < genreB) {
        comparison = 1;
      } else if (genreA > genreB) {
        comparison = -1;
      }
    } else {
      genreA = arr1.emirateName.toUpperCase();
      genreB = arr2.emirateName.toUpperCase();
      if (genreA > genreB) {
        comparison = 1;
      } else if (genreA < genreB) {
        comparison = -1;
      }
    }
    return comparison;
  };