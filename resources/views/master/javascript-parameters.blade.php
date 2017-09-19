<script type="text/javascript">

    var parameters = {}

        parameters.contact = {}
        parameters.contact.address = "{{getContent("datos-de-contacto")->address}}"
        parameters.contact.address2 = "{{getContent("datos-de-contacto")->address2}}"
        parameters.contact.phone = "{{getContent("datos-de-contacto")->phone}}"
        parameters.contact.cellphone = "{{getContent("datos-de-contacto")->cellphone}}"
        parameters.contact.lat = {{getContent("datos-de-contacto")->lat}}
        parameters.contact.lng = {{getContent("datos-de-contacto")->lng}}

</script>