import React from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { formatISODateDDMMMYY, formatISODateTime } from '../../util/dateUtil';
import { hideSpinner, showSpinner } from '../spinner';
import { formFilterObject, USNumberFormat } from '../../util/util';
import { properties } from '../../properties';
import { get, post } from '../../util/restUtil';
import moment from 'moment';

const ExportToExcelFile = ({ fileName, listKey, listSearch, listSelectedTab, filters, handleExportButton, header, url, method }) => {

    const apiUrl = url
    const apiMethod = method
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToCSV = (checkListKey, apiData, fileName) => {

        let tableData = [];
        let objConstruct = {};
        apiData.forEach(element => {

            if (checkListKey === "Campaign Listing") {
                objConstruct = {
                    "Campaign Name": element.campName,
                    "Campaign Description": element.campDescription,
                    "Access Number": element.serviceNo,
                    "Valid From": formatISODateDDMMMYY(new Date(element.validFrom)),
                    "Valid To": formatISODateDDMMMYY(new Date(element.validTo))
                }
            } else if (checkListKey === "Interactions Search") {
                objConstruct = {
                    "Interaction ID": element.intxnId,
                    "Interaction Category Type": element.ticketTypeDesc,
                    "Work Order Type": element.woTypeDescription,
                    "Access Number": element.accessNbr,
                    "Service Type": element.prodType,
                    "Customer Name": element.customerName,
                    "Customer Number": element.customerNbr,
                    "Account Name": element.accountName,
                    "Account Number": element.accountNo,
                    "Contact Number": element.contactNo,
                    "Assigned": element.assigned,
                    "Created Date": formatISODateDDMMMYY(new Date(element.createdAt)),
                    "Created By": element.createdBy,
                    "Status": element.currStatus
                }
            } else if (checkListKey === "Admin View User-User Management") {
                objConstruct = {
                    "First Name": element.firstName,
                    "Last Name": element.lastName,
                    "Email Id": element.email,
                    "Contact No": element.contactNo,
                    "User Type": element.userType,
                    "Status": element.status
                }
            } else if (checkListKey === "Admin View User-Roles Setup") {
                objConstruct = {
                    "Role ID": element.roleId,
                    "Role Name": element.roleName,
                    "Role Description": element.roleDesc,
                    "Is Admin": element.isAdmin
                }
            } else if (checkListKey === "Catalogue Listing") {
                objConstruct = {
                    "Plan ID": element.planId,
                    "Refill Profile ID": element.refillProfileId,
                    "Tariff Code": element.prodType,
                    "Bundle Name": element.planName,
                    "Bundle Category": element.planType,
                    "Services": element.prodType,
                    "Denomination": element.charge
                }
            } else if (checkListKey === "Customer Advance Search") {
                objConstruct = {
                    "Customer Number": element?.customerNo,
                    "Customer Name": element?.customerName,
                    "Account Number": element?.accountNo,
                    "Account Name": element?.accountName,
                    "Access Number": element?.accessNbr,
                    "Service Type": element?.serviceTypeDesc,
                    "Primary Contact Number": element?.contactNo,
                    "ID Number": element?.idValue,
                    "Service Status": element?.serviceStatusDesc
                }
            } else if (checkListKey === "Manage Parametrs") {
                objConstruct = {
                    "Business Parameter Name": element.code,
                    "Business Parameter Description": element.description,
                    "Parent Category": element.codeType,
                    "Status": element.status
                }
            }
            else if (checkListKey === "View All Notifications") {
                objConstruct = {
                    "Notification Title": element.source + " " + element.referenceId,
                    "Broadcast Message": element.subject,
                    "Notification Date - Time": formatISODateTime(element.createdAt)
                }
            }
            else if (checkListKey === "Account Property History") {
                objConstruct = {
                    "Account Property 1": element.property_1,
                    "Account Property 2": element.property_2,
                    "Account Property 3": element.property_3,
                    "Modified Date Time": formatISODateTime(element.updatedAt),
                    "Modified By": `${element.modifiedBy?.firstName} ${element.modifiedBy.lastName}`,
                }
            }
            else if (checkListKey === "Account Details History") {
                objConstruct = {
                    "Email": element.email,
                    "Title": element.contactType,
                    "First Name": element.contactType,
                    "Last Name": element.contactType,
                    "Contact Number": element.contactNo,
                    "Modified Date Time": formatISODateTime(element.updatedAt),
                    "Modified By": `${element.modifiedBy?.firstName} ${element.modifiedBy.lastName}`,
                }
            }
            else if (checkListKey === "Account Address History") {
                objConstruct = {
                    "Flat/House/Unit No": element.hno,
                    "Building Name/Others": element.buildingName,
                    "Street/Area": element.street,
                    "City/Town": element.city,
                    "District/Province": element.district,
                    "State/Region": element.state,
                    "ZIP": element.zip,
                    "Country": element.country,
                    "Modified Date Time": formatISODateTime(element.updatedAt),
                    "Modified By": `${element.modifiedBy?.firstName} ${element.modifiedBy.lastName}`,
                }
            }
            else if (checkListKey === "Customer Details History") {
                objConstruct = {
                    "Customer ID Type": element?.idTypeDesc?.description,
                    "ID Number": element?.idValue,
                    "Email": element.email,
                    "Contact Type": element?.contactTypeDesc?.description,
                    "Contact Number": element?.contactNo,
                    "Modified Date Time": formatISODateTime(element?.updatedAt),
                    "Modified By": `${element?.modifiedBy?.firstName} ${element?.modifiedBy.lastName}`,
                }
            }
            else if (checkListKey === "Customer Address History") {
                objConstruct = {
                    "Flat/House/Unit No": element?.hno,
                    "Building Name/Others": element?.buildingName,
                    "Street/Area": element?.street,
                    "City/Town": element?.city,
                    "District/Province": element?.district,
                    "State/Region": element?.state,
                    "ZIP": element?.zip,
                    "Country": element?.country,
                    "Modified Date Time": formatISODateTime(element?.updatedAt),
                    "Modified By": `${element?.modifiedBy?.firstName} ${element?.modifiedBy?.lastName}`,
                }
            }
            else if (checkListKey === "Customer Property History") {
                objConstruct = {
                    "Account Property 1": element?.property_1,
                    "Account Property 2": element?.property_2,
                    "Account Property 3": element?.property_3,
                    "Modified Date Time": formatISODateTime(element?.updatedAt),
                    "Modified By": `${element?.modifiedBy?.firstName} ${element?.modifiedBy.lastName}`,
                }
            }
            else if (checkListKey.includes("Contract List")) {
                objConstruct = {
                    "Contract ID": element?.contractId,
                    "Customer Number": element?.customer?.crmCustomerNo,
                    "Customer Name": `${element?.customer?.firstName || ""} ${element?.customer?.lastName || ""}`,
                    "Billable Reference Number": element?.billRefNo,
                    "Contract Start Date": element?.startDate ? moment(element?.startDate).format('DD-MMM-YYYY') : '-',
                    "Contract End Date": element?.endDate ? moment(element?.endDate).format('DD-MMM-YYYY') : '-',
                    "Status": element?.statusDesc?.description || "",
                    "RC": USNumberFormat(element?.rcAmount),
                    "NRC": USNumberFormat(element?.otcAmount),
                    "Usage": USNumberFormat(element?.usageAmount),
                    "Credit Adjustment": USNumberFormat(element?.creditAdjAmount),
                    "Debit Adjustment": USNumberFormat(element?.debitAdjAmount),
                    "Last Bill Period": element?.lastBillPeriod ? moment(element?.lastBillPeriod).format('DD-MMM-YYYY') : '-',
                    "Next Bill Period": element?.nextBillPeriod ? moment(element?.nextBillPeriod).format('DD-MMM-YYYY') : '-',
                    "Created By": `${element?.createdByName?.firstName || ""} ${element?.createdByName?.lastName || ""}`,
                    "Created At": element?.createdAt ? moment(element?.createdAt).format('DD MMM YYYY hh:mm:ss A') : '-',
                    "Updated By": `${element?.updatedByName?.firstName || ""} ${element?.updatedByName?.lastName || ""}`,
                    "Updated At": element?.updatedAt ? moment(element?.updatedAt).format('DD MMM YYYY hh:mm:ss A') : '-',
                }
            }
            else if (checkListKey === "Invoice List" || checkListKey === "Sales Order Invoice List") {
                objConstruct = {
                    "Invoice No": element?.invoiceId,
                    "Sales Order Number" : element?.invoiceDetails[0]?.monthlyContractDet?.soNumber,
                    "Customer Number": element?.customer[0]?.crmCustomerNo,
                    "Customer Name": `${element?.customer[0]?.firstName || ""} ${element?.customer[0]?.lastName  || ""}`,
                    "Billable Reference Number": element?.billRefNo,
                    "Invoice Start Date": element?.invStartDate ? moment(element?.invStartDate).format('DD-MMM-YYYY') : '-',
                    "Invoice End Date": element?.invEndDate ? moment(element?.invEndDate).format('DD-MMM-YYYY') : '-',
                    "Invoice Date": element?.invDate ? moment(element?.invDate).format('DD-MMM-YYYY') : '-',
                    "Due Date": element?.dueDate ? moment(element?.dueDate).format('DD-MMM-YYYY') : '-',
                    "Invoice Amount": USNumberFormat(element?.invAmt),
                    "Invoice O/S Amount": USNumberFormat(element?.invOsAmt),
                    "Invoice Status": checkListKey === "Invoice List" ? element?.invoiceStatus : checkListKey === "Sales Order Invoice List" ? element?.newInvoiceStatus : ''
                }
            }
            else if (checkListKey.includes("Account List")) {
                objConstruct = {
                    "Billable Reference Number": element?.account?.accountNo,
                    "Customer Number": element?.customer?.crmCustomerNo,
                    "Customer Name": `${element?.customer?.firstName} ${element?.customer?.lastName}`,
                    "Currency": element?.customer?.billableDetails[0]?.currencyDesc?.description,
                    "Contract ID": element?.contractId
                }
            }
            else if (checkListKey === "Billing") {
                objConstruct = {
                    "Contract ID": element?.contractId,
                    "Customer Number": element.customer?.crmCustomerNo,
                    "Customer Name": `${element?.customer?.firstName} ${element?.customer?.lastName}`,
                    "Billable Reference Number": element?.billRefNo,
                    "Contract Start Date": element?.startDate ? moment(element?.startDate).format('DD-MMM-YYYY') : '-',
                    "Contract End Date": element?.endDate ? moment(element?.endDate).format('DD-MMM-YYYY') : '-',
                    "Total RC": USNumberFormat(element?.rcAmount),
                    "Total NRC": USNumberFormat(element?.otcAmount),
                    "Total Usage": USNumberFormat(element?.usageAmount),
                    "Credit Adjustment": USNumberFormat(element?.creditAdjAmount),
                    "Debit Adjustment": USNumberFormat(element?.debitAdjAmount),
                    "Total Charge": USNumberFormat(element?.totalCharge)
                }
            }
            else if (checkListKey === "Billing History") {
                objConstruct = {
                    "Contract ID": element?.contractId,
                    "Customer No": element.customer?.crmCustomerNo,
                    "Customer Name": `${element?.customer?.firstName} ${element?.customer?.lastName}`,
                    "Billable Reference Number": element?.billRefNo,
                    "Contract Start Date": element?.startDate ? moment(element?.startDate).format('DD-MMM-YYYY') : '-',
                    "Contract End Date": element?.endDate ? moment(element?.endDate).format('DD-MMM-YYYY') : '-',
                    "Total RC": USNumberFormat(element?.rcAmount),
                    "Total NRC": USNumberFormat(element?.otcAmount),
                    "Total Usage": USNumberFormat(element?.usageAmount),
                    "Credit Adjustment": USNumberFormat(element?.creditAdjAmount),
                    "Debit Adjustment": USNumberFormat(element?.debitAdjAmount),
                    "Wavier": USNumberFormat(element?.wavier),
                    "Total Charge": USNumberFormat(element?.totalCharge)
                }
            }
            else if (checkListKey === "Invoice Preview List" || checkListKey === "Invoice Preview List History") {
                objConstruct = {
                    "Invoice ID": element?.invoiceId,
                    "Customer Number": element?.customer[0]?.crmCustomerNo,
                    "Customer Name": `${element?.customer[0]?.firstName} ${element?.customer[0]?.lastName}`,
                    "Billable Ref No": element?.billRefNo,
                    "Invoice Start Date": element?.invStartDate ? moment(element?.invStartDate).format('DD-MMM-YYYY') : '-',
                    "Invoice End Date": element?.invEndDate ? moment(element?.invEndDate).format('DD-MMM-YYYY') : '-',
                    "Invoice Date": element?.invDate ? moment(element?.invDate).format('DD-MMM-YYYY') : '-',
                    "Due Date": element?.dueDate ? moment(element?.dueDate).format('DD-MMM-YYYY') : '-',
                    "Invoice Amount": USNumberFormat(element.invAmt),
                    "Advance Amount": USNumberFormat(element.advanceAmount),
                    "Previous Balance Amount": USNumberFormat(element.previousBalanceAmount),
                    "Total Outstanding": USNumberFormat(element?.totalOutstanding),
                }
            }
            else if (checkListKey === "Search Customer") {
                objConstruct = {
                    "Customer Number": element?.crmCustomerNo,
                    "Customer Name": `${element?.firstName || ''} ${element?.lastName || ''}`,
                    "Customer Type": element?.customerTypeDesc?.description,
                    "Primary Contact Number": element?.contact?.contactNo,
                    "Customer Email": element?.contact?.email,
                    "Customer Status": element?.statusDesc?.description,
                    "Created By": `${element?.createdByName?.firstName} ${element?.createdByName?.lastName}`,
                    "Created At": element?.createdAt ? moment(element?.createdAt).format('DD MMM YYYY hh:mm:ss A') : '-',
                    "Updated By": `${element?.updatedByName?.firstName} ${element?.updatedByName?.lastName}`,
                    "Updated At": element?.updatedAt ? moment(element?.updatedAt).format('DD MMM YYYY hh:mm:ss A') : '-',
                }
            }
            else if (checkListKey === "Plan List" || checkListKey === "Service List") {
                let type = checkListKey.split(' ')[0];
                objConstruct = {
                    [`${type} Id`]: element[`${type.toLowerCase()}Id`],
                    [`${type} Name`]: element[`${type.toLowerCase()}Name`],
                    "Service Type": element?.serviceTypeDesc?.description,
                    "Charge Name": element[`${type.toLowerCase()}Charges`] && element[`${type.toLowerCase()}Charges`].length > 0 && element[`${type.toLowerCase()}Charges`].map((charge) => { return charge?.chargeDetails && charge?.chargeDetails?.chargeName || '' }).toString() || '-',
                    "Charge Amount": element[`${type.toLowerCase()}Charges`] && element[`${type.toLowerCase()}Charges`].length > 0 && element[`${type.toLowerCase()}Charges`].map((charge) => { return USNumberFormat(charge?.chargeAmount) || '' }).toString() || '-',
                    "Start Date": element?.startDate ? moment(element?.startDate).format('DD-MMM-YYYY') : '-',
                    "End Date": element?.endDate ? moment(element?.endDate).format('DD-MMM-YYYY') : '-',
                    "Status": element.statusDesc?.description,
                    "Updated By": `${element?.updatedByName?.firstName} ${element?.updatedByName?.lastName}`,
                    "Updated At": element?.updatedAt ? moment(element?.updatedAt).format('DD MMM YYYY hh:mm:ss A') : '-',
                    "Created By": `${element?.createdByName?.firstName} ${element?.createdByName?.lastName}`,
                    "Created At": element?.createdAt ? moment(element?.createdAt).format('DD MMM YYYY hh:mm:ss A') : '-',
                }
            }
            else if (checkListKey === "Addon List" || checkListKey === 'Asset List') {
                let type = checkListKey.split(' ')[0];
                objConstruct = {
                    [`${type} Id`]: element[`${type.toLowerCase()}Id`],
                    [`${type} Name`]: element[`${type.toLowerCase()}Name`],
                    "Service Type": element?.serviceTypeDes,
                    "Charge Name": element[`${type.toLowerCase()}Charges`] && element[`${type.toLowerCase()}Charges`].length > 0 && element[`${type.toLowerCase()}Charges`].map((charge) => { return charge?.chargeDetails && charge?.chargeDetails?.chargeName || '' }).toString() || '-',
                    "Charge Amount": element[`${type.toLowerCase()}Charges`] && element[`${type.toLowerCase()}Charges`].length > 0 && element[`${type.toLowerCase()}Charges`].map((charge) => { return USNumberFormat(charge?.chargeAmount) || '' }).toString() || '-',
                    "Start Date": element?.startDate ? moment(element?.startDate).format('DD-MMM-YYYY') : '-',
                    "End Date": element?.endDate ? moment(element?.endDate).format('DD-MMM-YYYY') : '-',
                    "Updated By": element?.updatedUser,
                    "Updated At": element?.updatedAt ? moment(element?.updatedAt).format('DD MMM YYYY hh:mm:ss A') : '-',
                    "Created By": element?.createdUser,
                    "Created At": element?.createdAt ? moment(element?.createdAt).format('DD MMM YYYY hh:mm:ss A') : '-',
                    "Status": element.statusDes,
                    "Volume Allowed": element.volumeAllowed,
                    "Multiple Selection": element.multipleSelection,
                }
            }
            else if (checkListKey === "Catalog List") {
                objConstruct = {
                    "Catalog Id": element?.catalogId,
                    "Catalog Name": element?.catalogName,
                    "Product Category": element?.serviceTypeDesc?.description,
                    "Plan": element?.planMap[0]?.planDetails[0]?.planName,
                    "Service Items": element?.serviceMap && element?.serviceMap.length > 0 && element?.serviceMap.map((service) => { return service?.serviceDetails && service?.serviceDetails[0]?.serviceName || '' }).toString() || '-',
                    "Asset Items": element?.assetMap && element?.assetMap.length > 0 && element?.assetMap.map((asset) => { return asset?.assetDetails && asset?.assetDetails[0]?.assetName || '' }).toString() || '-',
                    "Addon Items": element?.addonMap && element?.addonMap.length > 0 && element?.addonMap.map((addon) => { return addon?.addonDetails && addon?.addonDetails[0]?.addonName || '' }).toString() || '-',
                    "Status": element?.statusDesc?.description,
                    "Start Date": element?.startDate ? moment(element?.startDate).format('DD-MMM-YYYY') : '-',
                    "End Date": element?.endDate ? moment(element?.endDate).format('DD-MMM-YYYY') : '-',
                    "Created By": `${element?.createdByName?.firstName} ${element?.createdByName?.lastName}`,
                    "Created At": element?.createdAt ? moment(element?.createdAt).format('DD MMM YYYY hh:mm:ss A') : '-',
                    "Updated By": `${element?.updatedByName?.firstName} ${element?.updatedByName?.lastName}`,
                    "Updated At": element?.updatedAt ? moment(element?.updatedAt).format('DD MMM YYYY hh:mm:ss A') : '-',
                }
            }
            else if (checkListKey === "Charge List") {
                objConstruct = {
                    "Charge Id": element?.chargeId,
                    "Charge Name": element?.chargeName,
                    "Charge Category": element?.chargeCatDes,
                    "Service Type": element?.serviceTypeDes,
                    "Currency": element?.currencyDes,
                    "Status": element?.statusDes,
                    "GL Code": element?.glcode,
                    "Start Date": element?.startDate ? moment(element?.startDate).format('DD-MMM-YYYY') : '-',
                    "End Date": element?.endDate ? moment(element?.endDate).format('DD-MMM-YYYY') : '-',
                    "Created By": element?.createdUser,
                    "Created At": element?.createdAt ? moment(element?.createdAt).format('DD MMM YYYY hh:mm:ss A') : '-',
                    "Updated By": element?.updatedUser,
                    "Updated At": element?.updatedAt ? moment(element?.updatedAt).format('DD MMM YYYY hh:mm:ss A') : '-',
                }
            }
            else if (checkListKey === "Helpdesk Search") {
                const hasContactDetails = !!element?.contactDetails?.length;
                const hasCustomerDetails = hasContactDetails && !!element?.contactDetails[0]?.customerDetails?.length;
                objConstruct = {
                    "Helpdesk Id": element?.helpdeskId,
                    "ID Type": hasCustomerDetails ? element?.contactDetails[0]?.customerDetails[0]?.idTypeDesc?.description : '',
                    "ID Value": hasCustomerDetails ? element?.contactDetails[0]?.customerDetails[0]?.idValue : '',
                    "Source": element?.source,
                    "Source Reference": element?.sourceReference,
                    "Profile Number": hasCustomerDetails ? element?.contactDetails[0]?.customerDetails[0]?.crmCustomerNo : '',
                    "Full Name": hasCustomerDetails ? `${element?.contactDetails[0]?.customerDetails[0]?.firstName || ''} ${element?.contactDetails[0]?.customerDetails[0]?.lastName || ''}` : element?.name,
                    "Customer Type": hasCustomerDetails ? element?.contactDetails[0]?.customerDetails[0]?.customerTypeDesc?.description : '',
                    "Customer Number": element?.contactDetails[0]?.contactNo,
                    "Email": element?.email,
                    "Contact Preference": hasContactDetails ? element?.contactDetails[0]?.contactPreferenceDesc?.description : ''
                }
            } 
            else if (checkListKey === "Mapped Workflow Template"){
                objConstruct = {
                    "Mapping Id" :element?.mappingId,
                    "Template Name" : element?.mappingName,
                    "createdAt": element?.createdAt ? moment(element?.createdAt).format('DD MMM YYYY hh:mm:ss A') : '-',
                    "CreatedBy": element?.createdByName?.firstName || element?.createdByName?.lastName,
                    "Module" : element?.moduleDescription?.description,
                    "serviceType" : element?.mapping?.serviceTypeDescription,
                    "InteractionType": element?.mapping?.interactionTypeDescription,
                    "CustomerType" : element?.mapping?.customerTypeDescription,
                    "TemplateId" : element?.workflowId
                }
            } 
            else if (checkListKey === "Log List"){
                objConstruct = {
                    "Log Id" :element?.seq_no,
                    "Log Timestamp" : element?.log_timestamp,
                    "Application Name": element?.applicationname,
                    "Payload": element?.payload,
                    "Response": element?.response
                }
            }
            else {
                let map = new Map()
                const keys = Object.keys(element)
                for (const h of header) {
                    const head = h.accessor
                    if (keys.includes(head)) {
                        //console.log('Key = ', h.Header, ' value = ', element[head])
                        map.set(h.Header, element[head])
                    }

                }
                const obj = Object.fromEntries(map);
                objConstruct = {
                    ...obj
                }

            }
            tableData.push(objConstruct);
        });


        if (tableData.length !== 0) {
            const ws = XLSX.utils.json_to_sheet(tableData,
                {
                    origin: 'A2',                 //----Starting Excel cell Position
                    skipHeader: false             //----Header Skip 
                });

            //----Header As Upper Case The Origin Should Be A1 uncomment 123 to 129------//
            // var range = XLSX.utils.decode_range(ws['!ref']);
            // for (var C = range.s.r; C <= range.e.r; ++C) {
            //     var address = XLSX.utils.encode_col(C) + "1";
            //     if (!ws[address]) continue;
            //     ws[address].v = ws[address].v.toUpperCase();
            // }
            //----Header As Upper Case ------//


            const wb = {
                Sheets: { data: ws },
                SheetNames: ["data"]
            };

            const excelBuffer = XLSX.write(wb, {
                bookType: "xlsx",
                type: "array"
            });

            const data = new Blob(
                [excelBuffer], { type: fileType }
            );

            FileSaver.saveAs(data, fileName + fileExtension);
        }
    };

    const handleOnExportClick = async (e) => {
        fetchData();
    }

    const fetchData = () => {
        showSpinner();
        let url, requestBody, getApiMethod = 'NA';
        if (listSearch === 'NA') {
            requestBody = { filters: formFilterObject(filters) }
        } else {
            requestBody = listSearch;
        }

        if (listKey === "Campaign Listing") {
            url = `${properties.CAMPAIGN_API}/list`
            getApiMethod = "POST"

        } else if (listKey === "Interactions Search") {

            url = `${properties.INTERACTION_API}/search`
            getApiMethod = "POST"

        } else if (listKey === "Admin View User-User Management") {

            url = `${properties.USER_API}`
            getApiMethod = "GET"

        } else if (listKey === "Admin View User-Roles Setup") {

            url = `${properties.ROLE_API}`
            getApiMethod = "GET"

        } else if (listKey === "Catalogue Listing") {

            url = `${properties.CATALOGUE_API}/list`
            getApiMethod = "POST"

        } else if (listKey === "Customer Advance Search") {

            url = `${properties.CUSTOMER_API}/search`
            getApiMethod = "POST"

        } else if (listKey === "Account History") {

            url = `${properties.CUSTOMER_DETAILS}/account-history`
            getApiMethod = "POST"

        } else if (listKey === "Manage Parametrs") {

            if (listSelectedTab != "NA") {
                url = `${properties.BUSINESS_PARAMETER_API}/list/` + listSelectedTab
                getApiMethod = "GET"
            }

        } else if (listKey === "View All Notifications") {

            url = `${properties.NOTIFICATION_API}`
            getApiMethod = "GET"

        } else if (listKey === "Customer Details History") {

            url = `${properties.CUSTOMER_API}/details/history`
            getApiMethod = "POST"

        }
        else if (listKey === "Customer Address History") {

            url = `${properties.CUSTOMER_API}/address/history`
            getApiMethod = "POST"

        }
        else if (listKey === "Customer Property History") {

            url = `${properties.CUSTOMER_API}/property/history`
            getApiMethod = "POST"

        } else if (listKey === "Account Details History") {

            url = `${properties.CUSTOMER_API}/account/details/history`
            getApiMethod = "POST"

        }
        else if (listKey === "Account Address History") {

            url = `${properties.CUSTOMER_API}/account/address/history`
            getApiMethod = "POST"

        }
        else if (listKey === "Account Property History") {

            url = `${properties.CUSTOMER_API}/account/property/history`
            getApiMethod = "POST"

        }
        else if (listKey === "Contract List") {
            url = `${properties.CONTRACT_API}/search`
            getApiMethod = "POST"
        }
        else if (listKey === "Unbilled Contract List") {
            url = `${properties.CONTRACT_API}/monthly/search`
            getApiMethod = "POST"
        }
        else if (listKey === "Contract List") {
            url = `${properties.CONTRACT_API}/search`
            getApiMethod = "POST"
        }
        else if (listKey === "Unbilled Contract List") {
            url = `${properties.CONTRACT_API}/monthly/search`
            getApiMethod = "POST"
        }
        else if (listKey === "Contract History List") {
            url = `${properties.CONTRACT_API}/monthly/search?type=BILLED`
            getApiMethod = "POST"
        }
        else if (listKey === "Sales Order Contract List") {
            url = `${properties.CONTRACT_API}/sales-order/search`
            getApiMethod = "POST"
        }
        else if (listKey === "Sales Order Unbilled Contract List") {
            url = `${properties.CONTRACT_API}/sales-order/monthly/search`
            getApiMethod = "POST"
        }
        else if (listKey === "Sales Order Billed Contract List") {
            url = `${properties.CONTRACT_API}/sales-order/monthly/search?type=BILLED`
            getApiMethod = "POST"
        }
        
        else if (listKey === "Billing") {
            url = `${properties.CONTRACT_API}/monthly/search?type=UNBILLED`
            getApiMethod = "POST"
        }
        else if (listKey === "Billing History") {
            url = `${properties.BILLING_API}/contract/search`
            getApiMethod = "POST"
        }
        else if (listKey === "Invoice Preview List") {
            url = `${properties.INVOICE_API}/search?screen=billing`
            getApiMethod = "POST"
        }
        else if (listKey === "Invoice List" || listKey === "Invoice Preview List History") {
            url = `${properties.INVOICE_API}/search`
            getApiMethod = "POST"
        }
        else if (listKey === "Sales Order Invoice List") {
            url = `${properties.INVOICE_API}/sales-order/search`
            getApiMethod = "POST"
        }
        else if (listKey === "Account List") {
            url = `${properties.CONTRACT_API}/account/search`
            getApiMethod = "POST"
        }
        else if (listKey === "Search Customer") {
            url = `${properties.CUSTOMER_API}/searching`
            getApiMethod = "POST"
        }
        else if (listKey === "Plan List") {
            url = `${properties.PLANS_API}/search?excel=true`
            getApiMethod = "POST"
        }
        else if (listKey === "Service List") {
            url = `${properties.CATALOG_SERVICE_API}/search?excel=true`
            getApiMethod = "POST"
        }
        else if (listKey === "Addon List") {
            url = `${properties.ADDON_API}/all-list?excel=true`
            getApiMethod = "POST"
        }
        else if (listKey === "Asset List") {
            url = `${properties.ASSET_API}/all-list?excel=true`
            getApiMethod = "POST"
        }
        else if (listKey === "Catalog List") {
            url = `${properties.CATALOGUE_API}/search?excel=true`
            getApiMethod = "POST"
        }
        else if (listKey === "Plan List") {
            url = `${properties.PLANS_API}/search?excel=true`
            getApiMethod = "POST"
        }
        else if (listKey === "Charge List") {
            url = `${properties.CHARGE_API}/search?excel=true`
            getApiMethod = "POST"
        }
        else if (listKey === "Helpdesk Search") {
            url = `${properties.HELPDESK_API}/search`
            getApiMethod = "POST"
        }
        else if(listKey === "Channel List" || listKey === "Demographic List" || listKey ==="Agent List"){
            url = apiUrl
            getApiMethod = apiMethod
        }
        else if(listKey === "Log List"){
            url = `${properties.LOGS_API}/tibcoLogs?excel=true`
            getApiMethod = "POST"

        }
        else {
            url = apiUrl + '?excel=true'
            getApiMethod = apiMethod
        }
        if (getApiMethod === "GET") {
            get(url).then(response => {
                if (response && response.data && response.data.length > 0) {
                    exportToCSV(listKey, response.data, fileName)
                } else if (response && response.data.rows) {
                    exportToCSV(listKey, response.data.rows, fileName)
                }
                handleExportButton(true)
            }).finally(hideSpinner)

        } else {
            post(url, requestBody)
                .then((response) => {
                    exportToCSV(listKey, response.data.rows, fileName)
                    handleExportButton(true)
                })
                .finally(hideSpinner)
        }
    };

    return (
        <div className="col-md-12 text-left mt-0">
            <div className="justify-content-center excel">
                <button className="btn btn-primary btn-md  waves-effect waves-light m-2 float-left"
                    onClick={handleOnExportClick}>Export to Excel</button>
            </div>
        </div>
    );
};

export default ExportToExcelFile;
