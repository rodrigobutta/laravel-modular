<div class="panel accordion potencia" data-accordion>
    <h4 data-toggle="collapse"  data-parent="#conversor" class="collapsed" data-control>Potencia</h4>
    <form id="potencia" method="post" action="" data-content>
        <fieldset>
            <p class="from">
                <label>de</label>
                <select name="from">
                    <option value="hp">hp</option><option value="kw">kW</option><option value="kcal">Kcal/(IT)/h</option><option value="btu">Btu/(IT)/h</option><option value="cv">CV</option><option value="ton">Tonelada de refrigeración</option>
                </select>
            </p>
            <p class="to">
                <label>a</label>
                <select name="to">
                    <option value="kw">kW</option><option value="hp">hp</option><option value="kcal">Kcal/(IT)/h</option><option value="btu">Btu/(IT)/h</option><option value="cv">CV</option><option value="ton">Tonelada de refrigeración</option>
                </select>
            </p>
            <p class="amount">
                <label>Cantidad</label>
                <input name="amount" type="number" value="" />
            </p>

            <p class="result"><label>Resultado</label> <span>0</span></p>
            <p class="convert"><input type="button" name="convert" value="Convertir" onclick="convert_units('potencia');return false;" /></p>
        </fieldset>
    </form>
</div>
<div class="panel accordion longitud" data-accordion>
    <h4 data-toggle="collapse"  data-parent="#conversor" class="collapsed" data-control>Longitud</h4>
    <form id="longitud" method="post" action="" data-content>
        <fieldset>
            <p class="from">
                <label>de</label>
                <select name="from">
                    <option value="pie">Pies</option><option value="mt">Metro</option><option value="mm">mm</option><option value="km">Km</option><option value="pul">Pulgada</option><option value="yard">Yardas</option><option value="mil">Millas</option><option value="mil_n">Millas náuticas</option>
                </select>
            </p>
            <p class="to">
                <label>a</label>
                <select name="to">
                    <option value="mt">Metro</option><option value="pie">Pies</option><option value="mm">mm</option><option value="km">Km</option><option value="pul">Pulgada</option><option value="yard">Yardas</option><option value="mil">Millas</option><option value="mil_n">Millas náuticas</option>
                </select>
            </p>
            <p class="amount">
                <label>Cantidad</label>
                <input name="amount" type="number" value="" />
            </p>

            <p class="result"><label>Resultado</label> <span>0</span></p>
            <p class="convert"><input type="button" name="convert" value="Convertir" onclick="convert_units('longitud');return false;" /></p>
        </fieldset>
    </form>
</div>
<div class="panel accordion presion" data-accordion>
    <h4 data-toggle="collapse"  data-parent="#conversor" class="collapsed" data-control>Presión</h4>
    <form id="presion" method="post" action="" data-content>
        <fieldset>
            <p class="from">
                <label>de</label>
                <select name="from">
                    <option value="bar">Bares</option><option value="pasc">Pascales</option><option value="atm">Atmósferas</option><option value="kg">Kg/cm²</option><option value="lbr1">Libras/pie²</option><option value="lbr2">Libras/pulg²</option>
                </select>
            </p>
            <p class="to">
                <label>a</label>
                <select name="to">
                    <option value="pasc">Pascales</option><option value="bar">Bares</option><option value="atm">Atmósferas</option><option value="kg">Kg/cm²</option><option value="lbr1">Libras/pie²</option><option value="lbr2">Libras/pulg²</option>
                </select>
            </p>
            <p class="amount">
                <label>Cantidad</label>
                <input name="amount" type="number" value="" />
            </p>

            <p class="result"><label>Resultado</label> <span>0</span></p>
            <p class="convert"><input type="button" name="convert" value="Convertir" onclick="convert_units('presion');return false;" /></p>
        </fieldset>
    </form>
</div>
<div class="panel accordion superficie" data-accordion>
    <h4 data-toggle="collapse"  data-parent="#conversor" class="collapsed" data-control>Superficie</h4>
    <form id="superficie" method="post" action="" data-content>
        <fieldset>
            <p class="from">
                <label>de</label>
                <select name="from">
                    <option value="pie">Pies²</option><option value="m2">M²</option><option value="hct">Hectáreas</option><option value="km">Km²</option><option value="yar">Yards²</option><option value="acr">Acres</option>
                </select>
            </p>
            <p class="to">
                <label>a</label>
                <select name="to">
                    <option value="m2">M²</option><option value="pie">Pies²</option><option value="hct">Hectáreas</option><option value="km">Km²</option><option value="yar">Yards²</option><option value="acr">Acres</option>
                </select>
            </p>
            <p class="amount">
                <label>Cantidad</label>
                <input name="amount" type="number" value="" />
            </p>

            <p class="result"><label>Resultado</label> <span>0</span></p>
            <p class="convert"><input type="button" name="convert" value="Convertir" onclick="convert_units('superficie');return false;" /></p>
        </fieldset>
    </form>
</div>
<div class="panel accordion volumen" data-accordion>
    <h4 data-toggle="collapse"  data-parent="#conversor" class="collapsed" data-control>Volumen</h4>
    <form id="volumen" method="post" action="" data-content>
        <fieldset>
            <p class="from">
                <label>de</label>
                <select name="from">
                    <option value="gal">Galones</option><option value="m3">M³</option><option value="ltr">Litro</option><option value="pie">Pies³</option><option value="yar">Yardas³</option>
                </select>
            </p>
            <p class="to">
                <label>a</label>
                <select name="to">
                    <option value="m3">M³</option><option value="gal">Galones</option><option value="ltr">Litro</option><option value="pie">Pies³</option><option value="yar">Yardas³</option>
                </select>
            </p>
            <p class="amount">
                <label>Cantidad</label>
                <input name="amount" type="number" value="" />
            </p>

            <p class="result"><label>Resultado</label> <span>0</span></p>
            <p class="convert"><input type="button" name="convert" value="Convertir" onclick="convert_units('volumen');return false;" /></p>
        </fieldset>
    </form>
</div>
<div class="panel accordion temperatura" data-accordion>
    <h4 data-toggle="collapse"  data-parent="#conversor" class="collapsed" data-control>Temperatura</h4>
    <form id="temperatura" method="post" action="" data-content>
        <fieldset>
            <p class="from">
                <label>de</label>
                <select name="from">
                    <option value="c">ºF (Farenheit)</option><option value="f">ºC (Celsius)</option>
                </select>
            </p>
            <p class="to">
                <label>a</label>
                <select name="to">
                    <option value="f">ºC (Celsius)</option><option value="c">ºF (Farenheit)</option>
                </select>
            </p>
            <p class="amount">
                <label>Cantidad</label>
                <input name="amount" type="number" value="" />
            </p>

            <p class="result"><label>Resultado</label> <span>0</span></p>
            <p class="convert"><input type="button" name="convert" value="Convertir" onclick="convert_units('temperatura');return false;" /></p>
        </fieldset>
    </form>
</div>
<div class="panel accordion peso" data-accordion>
    <h4 data-toggle="collapse"  data-parent="#conversor" class="collapsed" data-control>Peso</h4>
    <form id="peso" method="post" action="" data-content>
        <fieldset>
            <p class="from">
                <label>de</label>
                <select name="from">
                    <option value="libr">Libra</option><option value="kg">Kilogramos</option><option value="onz">Onza</option><option value="ton">Tonelada</option><option value="gr">Gramos</option>
                </select>
            </p>
            <p class="to">
                <label>a</label>
                <select name="to">
                    <option value="kg">Kilogramos</option><option value="libr">Libra</option><option value="onz">Onza</option><option value="ton">Tonelada</option><option value="gr">Gramos</option>
                </select>
            </p>
            <p class="amount">
                <label>Cantidad</label>
                <input name="amount" type="number" value="" />
            </p>

            <p class="result"><label>Resultado</label> <span>0</span></p>
            <p class="convert"><input type="button" name="convert" value="Convertir" onclick="convert_units('peso');return false;" /></p>
        </fieldset>
    </form>
</div>
<div class="panel accordion caudal" data-accordion>
    <h4 data-toggle="collapse"  data-parent="#conversor" class="collapsed" data-control>Caudal Volumétrico</h4>
    <form id="caudal" method="post" action="" data-content>
        <fieldset>
            <p class="from">
                <label>de</label>
                <select name="from">
                    <option value="fth">ft³/h</option><option value="lh">l/h</option><option value="fts">ft³/s</option><option value="ftm">ft³/min</option><option value="ms">m³/s</option><option value="mm">m³/min</option><option value="mh">m³/h</option><option value="ls">l/s</option><option value="lm">l/min</option>
                </select>
            </p>

            <p class="to">
                <label>a</label>
                <select name="to">
                    <option value="lh">l/h</option><option value="fth">ft³/h</option><option value="fts">ft³/s</option><option value="ftm">ft³/min</option><option value="ms">m³/s</option><option value="mm">m³/min</option><option value="mh">m³/h</option><option value="ls">l/s</option><option value="lm">l/min</option>
                </select>
            </p>
            <p class="amount">
                <label>Cantidad</label>
                <input name="amount" type="number" value="" />
            </p>

            <p class="result"><label>Resultado</label> <span>0</span></p>
            <p class="convert"><input type="button" name="convert" value="Convertir" onclick="convert_units('caudal');return false;" /></p>
        </fieldset>
    </form>
</div>