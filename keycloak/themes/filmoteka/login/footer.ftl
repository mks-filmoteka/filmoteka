<#macro content>
    <#if pageId == "info"
        && client??
        && client.clientId == "filmoteka-ui"
        && (client.baseUrl)?has_content
        && messageHeader??>

        <#local mode = "">

        <#if messageHeader == msg("emailUpdateConfirmationSentTitle")>
            <#local mode = "waiting">
        <#elseif messageHeader == msg("emailUpdatedTitle")
            && message??
            && message.type == "success">
            <#local mode = "success">
        </#if>

        <#if mode?has_content>
            <div
                id="filmoteka-email-update"
                hidden
                data-mode="${mode}"
                data-app-url="${client.baseUrl}"
                data-realm="${realm.name}"
                data-client-id="${client.clientId}"
            ></div>

            <script
                src="${url.resourcesPath}/js/email-update.js"
                defer
            ></script>
        </#if>
    </#if>
</#macro>