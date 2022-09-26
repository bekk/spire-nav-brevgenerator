import * as React from 'react';

const NavIkon = () => {
    return (
        <svg className={'nav-ikon'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 32">
            <path
                fill="#C30000"
                d="M36.751151 14.973167h-2.764975s-.230416 0-.230416.115l-1.497694 4.8375-1.497697-4.8375c-.230416-.115-.345622-.115-.345622-.115H25c-.1152 0-.230414.115-.230414.230333v1.6125c0-1.267-1.382489-1.842833-2.18894-1.842833-1.843319 0-2.995393 1.151833-3.341015 2.994666 0-1.267-.1152-1.6125-.46083-2.073166-.1152-.2305-.345621-.460834-.576037-.576-.46083-.230334-.921657-.3455-1.843317-.3455H15.32258s-.230413 0-.230413.230333l-1.036867 2.534v-2.418833c0-.115-.1152-.230334-.230416-.230334h-2.534563s-.230413 0-.230413.230334l-1.036866 2.534s-.1152003.230333.1152.230333h.92166v4.952667c0 .115.115199.230333.230414.230333h2.534562c.1152 0 .230415-.115.230415-.230333V18.083h.921658c.576037 0 .691246 0 .921659.115.1152.115.230414.115.345623.230333.1152.230334.1152.576.1152 1.382167v3.109833c0 .115.1152.230334.230415.230334h2.419355s.230415 0 .345621-.230334l.576038-1.267c.691245 1.036667 1.843318 1.6125 3.225807 1.6125h.345621s.230416 0 .345623-.230333l.921658-2.3035v2.418667c0 .115.115201.230333.230416.230333h2.419354s.230416 0 .345622-.230333c0 0 .92166-2.418667.92166-2.533834 0-.2305-.230414-.2305-.230414-.2305h-.806439v-4.2615l2.649769 6.910667c.1152.230333.345623.230333.345623.230333h2.880184s.230414 0 .345623-.230333l2.995391-7.601833c.230413-.460667-.1152-.460667-.1152-.460667m-11.981574 5.183h-1.612904c-.691243 0-1.152073-.575833-1.152073-1.151833 0-.575834.576037-1.151667 1.152073-1.151667h.46083c.691245 0 1.152074.575833 1.152074 1.151667zM3.2258067 14.973167L0 23.150833h3.1105983l3.2258067-8.177666zm36.4055303 8.177666l3.225806-8.177666h1.72811l-3.225806 8.177666zm9.447004-8.177666l-3.1106 8.177666h.806452L50 14.973167zM23.387097 32.25c-8.640554 0-15.7834103-7.256333-15.7834103-16.125C7.6036867 7.256167 14.631337 0 23.387097 0c8.75576 0 15.78341 7.256167 15.78341 16.125-.1152 8.868667-7.142857 16.125-15.78341 16.125"
            />
            <path
                d="M24.896116 23.30368c-.05192-.05192-.07269-.436106-.07269-1.344659 0-.774648-.02177-1.249478-.05567-1.214433-.03062.03164-.263578.578439-.51769 1.215091-.506276 1.268415-.52852 1.296659-1.019462 1.294345-.412421-.0019-1.074337-.112694-1.485717-.248586-.521437-.172248-1.241828-.665922-1.546679-1.059918-.136833-.176847-.267241-.302031-.289794-.278188-.02256.02385-.154886.302288-.29407.618768-.388976.884462-.310984.847983-1.813031.847983-.938877 0-1.277331-.01946-1.324377-.07614-.04044-.04873-.07037-.860896-.08313-2.256242-.01441-1.57662-.04046-2.215909-.09408-2.309473-.04078-.07116-.177065-.192862-.302851-.270456-.205408-.12671-.316621-.143416-1.091829-.164011l-.863127-.02293v2.515018c0 2.20562-.01171 2.526728-.09518 2.6102-.14213.14213-2.635448.14213-2.777578 0-.08346-.08347-.09518-.404071-.09518-2.604529v-2.509337h-.514845c-.371175 0-.515016-.02113-.515453-.07571-.000333-.04164.250689-.695801.557827-1.453685l.558434-1.377976h1.373003c1.066923 0 1.387873.01791 1.439703.08037.04248.05118.07267.529704.08313 1.317402l.01643 1.237036.556271-1.36283.556271-1.362832 1.10941.000512c1.009476.000465 1.147122.01348 1.52805.144478.516921.177767.844343.485308 1.126176 1.057789.177386.360325.204499.483211.239536 1.085738.02173.373683.05413.63854.07201.58857.01788-.04997.108756-.328604.201957-.619187.483142-1.506382 1.663918-2.349472 3.188433-2.276584.455315.02177.587232.05507.971416.245206.630888.312234 1.080542.839946 1.080542 1.268121 0 .09014.0265.180269.05889.200287.03681.02275.0652-.288201.07571-.829266l.01682-.865664 2.755947-.01738c1.51577-.0096 2.837716-.0027 2.937657.0153l.181711.03269.632119 2.044082c.347665 1.124245.684938 2.216508.749494 2.427251.06456.210742.138499.360653.164314.333135.02581-.02752.381271-1.133482.789903-2.457698l.742967-2.407668h1.534541c1.58786 0 1.570341-.0028 1.536257.242281-.007.04997-.693097 1.82165-1.524772 3.937067-.94511 2.403946-1.558824 3.885957-1.636646 3.952207-.111297.09474-.283793.106-1.625347.106-1.33983 0-1.514678-.01137-1.629871-.106-.08659-.07113-.559637-1.231636-1.43817-3.528216-.720025-1.88222-1.332766-3.448113-1.361647-3.47976-.02973-.03258-.05251.879576-.05251 2.102366v2.159908l.499704.01759c.459384.01618.501208.02814.518339.148376.02973.208713-.88911 2.612834-1.03865 2.717576-.168019.117685-2.577007.132546-2.69294.01661zm-.07269-3.732248c0-.776041-.107856-1.141576-.420051-1.423628-.268862-.2429-.562146-.343226-1.00335-.343226-.422418 0-.688319.0862-.961805.311788-.553854.456862-.600854 1.18631-.1101 1.708873.282185.300478.440531.335953 1.511043.338532l.984267.0023z"
                fill="#fff"
            />
            s
            <path
                d="M24.896116 23.30368c-.05176-.05176-.07269-.426683-.07269-1.30226 0-.676267-.02222-1.229577-.04939-1.229577-.02717 0-.259896.527608-.517184 1.172463-.512691 1.284987-.533887 1.312038-1.026247 1.309718-.412421-.0019-1.074337-.112694-1.485717-.248586-.494047-.1632-1.20475-.63992-1.525963-1.023574-.13882-.165806-.270977-.301466-.293679-.301466-.0227 0-.162442.275303-.310534.611785-.14809.336481-.335077.663561-.415527.726843-.133016.104633-.260128.115057-1.402663.115057-.931468 0-1.272518-.01958-1.318757-.07571-.03929-.0477-.07036-.882479-.08397-2.256242-.01601-1.616674-.04148-2.215719-.0985-2.316614-.0423-.07484-.191836-.196797-.332304-.271-.220033-.116235-.370724-.138034-1.088239-.157433l-.832841-.02251v2.515148c0 2.205737-.01171 2.526857-.09518 2.610329-.14213.14213-2.635449.14213-2.777579 0-.08347-.08347-.09518-.404063-.09518-2.604521v-2.509347h-.514832c-.371086 0-.515063-.02114-.51562-.07571-.000425-.04164.250167-.695801.556871-1.453685l.557643-1.377976h1.373961c1.067717 0 1.388827.01791 1.440659.08037.04246.05116.07268.528776.08313 1.313975l.01643 1.233609.555524-1.359404.555524-1.359404 1.110157.000512c1.010263.000465 1.147828.01347 1.528797.14448.516931.17777.844345.485307 1.126196 1.057828.174854.355182.203706.482372.229114 1.010025.01599.33202.04587.603634.0664.603589.02053-.000047.08706-.1704.147828-.378565.189202-.648059.46694-1.137203.888911-1.565527.646246-.655975 1.437941-.947154 2.420579-.890269.401255.02322.559705.06582.935268.251439.523792.258872.909484.652087 1.012315 1.032062.127118.469712.144392.428396.174607-.41759l.03029-.847984 2.755946-.01738c1.51577-.0096 2.838583-.0027 2.939584.01541l.183638.03279.629305 2.043981c.790653 2.568039.888451 2.854956.934132 2.740538.05271-.132019 1.491506-4.77545 1.491506-4.813534 0-.01764.695044-.03209 1.544542-.03209 1.598331 0 1.579997-.0029 1.546468.242281-.0068.04997-.69253 1.82165-1.52377 3.937067-.957649 2.437116-1.557327 3.885043-1.636857 3.952208-.112161.09472-.285178.106-1.62635.106-1.339988 0-1.51462-.01136-1.629458-.106-.08557-.07052-.565091-1.241166-1.432604-3.497397-.71719-1.865269-1.330117-3.417533-1.362059-3.449475-.03705-.03706-.05808.712754-.05808 2.071546v2.129624l.499705.01759.499704.01759-.0071.211996c-.01033.309519-.841344 2.490714-.998067 2.619663-.113496.09338-.277958.106-1.381978.106-.893913 0-1.273987-.02083-1.325835-.07269zm-.07269-3.67969c0-.712572-.08472-1.082027-.311087-1.356651-.239274-.290282-.452337-.395886-.891288-.441766-.705014-.07369-1.259709.190977-1.517849.724221-.06962.143814-.12598.355086-.125249.469494.0028.429415.383229.970574.762117 1.083955.09647.02887.604685.05483 1.129373.05769l.953983.0052z"
                fill="#fff"
            />
            <path
                d="M24.896116 23.30368c-.05123-.05123-.07296-.404227-.07361-1.196262-.000484-.617968-.0239-1.159821-.05199-1.204118-.04776-.07533-.234304.335571-.82338 1.813632-.18083.453726-.29862.538555-.746812.537835-1.13879-.0018-2.190921-.441415-2.934556-1.22607l-.34803-.367227-.302708.641742c-.16649.352958-.363463.684296-.437719.736307-.111784.0783-.350238.09457-1.386092.09457-.927962 0-1.266831-.01956-1.312061-.07571-.03711-.04608-.0725-.929255-.0904-2.256242-.01618-1.199291-.04978-2.22895-.07468-2.288132-.02489-.05918-.168964-.180102-.320164-.268711-.253458-.148537-.340346-.163197-1.113454-.18787l-.838543-.02676v2.517104c0 2.207514-.01171 2.528809-.09518 2.612284-.14213.14213-2.635449.14213-2.777579 0-.08346-.08347-.09518-.404064-.09518-2.604522v-2.509347h-.514842c-.40276 0-.514847-.0186-.514847-.08544 0-.04699.249708-.701151.554908-1.453686l.554909-1.368242h1.371225c.985748 0 1.391658.02043 1.443909.07269.05168.05168.07269.422197.07269 1.28207 0 .665162.0195 1.189889.04332 1.16606.02383-.02383.2802-.621202.569715-1.327498l.526389-1.284172.899113-.01778c1.78057-.03519 2.371033.219442 2.87669 1.24057.152244.307444.19074.470751.214167.908554.01571.293556.04151.573827.05733.622823.01582.049.110544-.154261.210489-.451683.231111-.687754.514084-1.152535.93706-1.53911.618239-.565035 1.418072-.833813 2.325034-.781309.893634.05173 1.760265.631456 1.96532 1.314683.113196.377157.151897.241469.171189-.600198l.01597-.696558 2.877087-.01456c1.582397-.008 2.907875.0057 2.945506.03029.03763.02465.388075 1.080586.778764 2.346505.390687 1.265918.73276 2.342555.760161 2.392525.03928.07164.06346.05499.114303-.07874.04913-.129233 1.265844-4.02967 1.435028-4.600303.02886-.09733.156893-.106 1.566838-.106 1.174058 0 1.541542.01782 1.561458.07571.03773.1097-.03876.314031-1.615674 4.31563-.910597 2.310741-1.478089 3.672817-1.558316 3.740212-.112731.0947-.28609.106-1.627011.106-1.339794 0-1.514691-.01138-1.629966-.106-.08592-.07053-.556238-1.210486-1.405658-3.407075-.70209-1.815594-1.29071-3.348778-1.308045-3.407077-.105511-.354844-.138528.117415-.138528 1.981226v2.087224l.499704.01759.499704.01759-.0061.211995c-.0089.306335-.841761 2.48985-.999235 2.619664-.113291.09339-.277622.106-1.381735.106-.893912 0-1.273986-.02083-1.325834-.07269zm-.0879-3.854731c-.03731-.809711-.141544-1.103606-.483927-1.364418-.433631-.33032-1.216588-.361972-1.715881-.06937-.606618.355502-.793157 1.077277-.41796 1.617206.105778.152213.293942.318071.450959.397489.245867.124355.353916.136282 1.23465.136282h.965202z"
                fill="#fff"
            />
            <path
                d="M24.896116 23.30368c-.05035-.05034-.07455-.390161-.07872-1.105407-.0033-.567997-.02671-1.100864-.05197-1.184149-.05356-.176587-.04209-.199217-.633517 1.249668-.390326.95622-.42463.991432-.965889.991432-1.1024 0-2.162822-.448421-2.9001-1.226364l-.347875-.367063-.29912.638956c-.164516.351427-.361558.682691-.437873.736145-.116481.08159-.339571.09719-1.389834.09719-.928508 0-1.26654-.01952-1.311037-.07571-.03537-.04466-.07502-.957733-.09669-2.225957-.020191-1.182641-.054461-2.212421-.076147-2.288408-.021684-.075986-.160732-.209246-.308994-.296133-.246162-.144261-.342794-.16061-1.112994-.188309l-.843429-.03033v2.517811c0 2.208158-.01171 2.529515-.09518 2.612992-.14213.14213-2.635449.14213-2.777579 0-.08347-.08347-.09518-.404063-.09518-2.604521v-2.509337h-.51485c-.412348 0-.514847-.01771-.514847-.08894 0-.04892.245268-.696265.545039-1.438543l.54504-1.349599 1.370466-.0163c.95984-.01141 1.395428.0044 1.453778.05284.06551.05437.08331.322509.08331 1.254961 0 .775988.02055 1.165262.05948 1.126342.03271-.03271.28849-.617365.568397-1.299232l.508923-1.239756.961001-.01729c1.49334-.02687 2.131084.172411 2.563622.801084.330446.480288.440546.801238.473575 1.380508.01676.293937.049.54588.07165.559874.02264.014.103088-.170742.178764-.410526.488151-1.546727 1.695238-2.413489 3.247644-2.332008.43042.02259.573129.05991.959657.25094.514227.254145.9054.6458 1.016986 1.018241.03854.128662.08617.217979.105811.198481.01964-.0195.04935-.353567.06601-.742377l.03029-.706925 2.877086-.01456c1.582398-.008 2.907849.0057 2.945446.03029.05376.03526.896202 2.647712 1.457398 4.519422.04894.163254.11134.271565.139565.242282.02808-.02912.354324-1.034197.724998-2.233488.370673-1.19929.702091-2.269112.736483-2.377382l.06253-.196854h1.533364c1.287559 0 1.538797.01416 1.567256.08832.01864.04858-.316156.982116-.743992 2.074532-1.917597 4.896297-2.313429 5.866568-2.434993 5.968703-.112719.0947-.28607.106-1.626996.106-1.339878 0-1.51466-.01137-1.629747-.106-.08433-.06934-.464537-.975146-1.099578-2.619662-.533866-1.382517-1.125985-2.915354-1.31582-3.406306-.237645-.614599-.358141-.859863-.386846-.787413-.02293.05788-.04361.996779-.04594 2.086453l-.0042 1.981226.499704.01759.499705.01759-.0061.211996c-.0089.306334-.841761 2.48985-.999236 2.619663-.113291.09339-.277622.106-1.381734.106-.893913 0-1.273987-.02083-1.325835-.07269zm-.09418-3.83709c-.05477-.958792-.182416-1.242252-.675066-1.498988-.360885-.18807-1.051059-.182532-1.445413.0116-.312692.153929-.602055.524345-.677326.867052-.09827.447418.317068 1.120116.772714 1.25152.109555.0316.619007.0599 1.132117.06291l.932928.0054z"
                fill="#fff"
            />
            <path
                d="M24.896116 23.30368c-.04901-.04901-.07463-.349833-.07868-.923696-.0033-.468056-.02556-1.000923-.04947-1.184148-.05062-.387818.01528-.494933-.57195.929757-.21764.528023-.444888.999581-.504994 1.047907-.08521.06851-.242693.0814-.714989.05854-1.104785-.05348-1.994882-.44851-2.709446-1.202468l-.347205-.366349-.297178.636413c-.163539.350226-.360746.680939-.438541.735429-.119759.08388-.332579.09901-1.392447.09901-.928513 0-1.266538-.01952-1.311029-.07571-.03526-.04452-.0765-.973947-.100144-2.256242-.04478-2.429147-.03187-2.359109-.47721-2.590219-.172842-.0897-.403046-.122747-1.041404-.149511l-.819512-.03436v2.51841c0 2.208705-.0117 2.530117-.09518 2.613593-.14213.14213-2.635448.14213-2.777578 0-.08347-.08347-.09518-.404063-.09518-2.604521v-2.50934h-.514839c-.421964 0-.514847-.01673-.514847-.09277 0-.05102.244748-.698364.543884-1.438544l.543885-1.345782 1.371621-.0163c.960705-.01141 1.39658.0044 1.454933.05284.06532.05421.08331.316092.08331 1.212561 0 .62888.02245 1.143419.04989 1.143419.02745 0 .281895-.565575.565454-1.256834l.515562-1.256832.963944-.01729c1.113535-.01998 1.664288.07092 2.098608.346359.546597.346641.890945 1.005136.940434 1.798384.01753.280993.05397.524549.08097.541238.027.01669.07981-.08632.117342-.228909.14737-.559816.490739-1.157395.901058-1.568147.664764-.665467 1.367716-.932298 2.345617-.890367.491182.02107.604678.04911 1.010595.249721.517545.255784.908336.646432 1.02021 1.019834.03855.128663.08378.220235.100523.203495.01674-.01675.04644-.35081.06601-.742377l.03557-.711939 2.877087-.01456c1.582398-.008 2.907642.0057 2.944988.03029.03734.02466.388388 1.071046.780094 2.325304.6888 2.205559.781626 2.473085.836909 2.411971.0142-.01569.317034-.968883.672974-2.118204.35594-1.14932.688705-2.219142.73948-2.377382l.09231-.287709h1.541574c1.190868 0 1.548295.01751 1.571113.07698.05767.150276-3.015701 7.906925-3.191414 8.05458-.1127.09471-.286041.106-1.626976.106-1.340266 0-1.514517-.01134-1.628725-.106-.07034-.0583-.239351-.392192-.375581-.741985-.13623-.349792-.711468-1.835278-1.278305-3.301078s-1.047441-2.705975-1.06801-2.755947c-.08512-.206797-.117567.357963-.124411 2.165387l-.0071 1.89282h.486462c.393449 0 .493696.01884.524287.09857.07521.195984-.805436 2.584235-1.018966 2.763379-.111404.09347-.27453.106-1.379495.106-.893912 0-1.273987-.02083-1.325835-.07269zm-.07315-3.425248c-.0023-1.486356-.35967-2.021041-1.358048-2.032286-.561465-.0063-.820356.08869-1.116195.409635-.263874.286268-.398506.65603-.336372.923825.06218.26798.307734.656673.490513.776435.256693.168191.459633.197186 1.427151.2039l.893411.0062-.000484-.287709z"
                fill="#fff"
            />
            <path
                d="M24.896116 23.30368c-.04578-.04577-.0728-.275652-.073-.620844-.000425-.765767-.0697-1.730595-.121916-1.698324-.02401.01483-.241759.505609-.483892 1.090605-.294861.712382-.481385 1.085643-.564824 1.130299-.159985.08562-1.160581.02432-1.615287-.09896-.633058-.171634-1.205173-.505414-1.67975-.979993l-.443674-.443673-.292849.625563c-.16186.345754-.35676.670327-.435735.725644-.12167.08522-.328665.100078-1.39397.100078-.928325 0-1.266638-.01953-1.311381-.07571-.03545-.0445-.07706-.92468-.100945-2.135101-.02235-1.132665-.0563-2.149055-.07544-2.258646-.07593-.434657-.583122-.608931-1.792105-.615782l-.46942-.0027v2.509338c0 2.200458-.01171 2.521056-.09518 2.604521-.14213.14213-2.635449.14213-2.777579 0-.08347-.08347-.09518-.404063-.09518-2.604521v-2.509291h-.514849c-.450922 0-.514531-.01317-.512298-.106.0014-.0583.244831-.705643.540954-1.438543l.538405-1.332546 1.374552-.0163c.962898-.01142 1.399501.0044 1.457863.05284.06517.05409.08331.311509.08331 1.182277 0 .624938.02408 1.113133.05489 1.113133.05087 0 .229427-.399552.839114-1.877678l.237343-.575418.963725-.01729c1.14798-.0206 1.684334.0725 2.128712.369483.530943.354839.924685 1.149572.924685 1.866395 0 .523751.06526.5175.269633-.02582.245732-.653264.502853-1.051569.932467-1.44448.620296-.567301 1.334633-.811102 2.248505-.76741.420123.02009.594975.06043.918974.212051.510186.238745.85635.55237 1.042895.944863l.147363.310057.03732-.451354c.02052-.248245.04381-.574008.05174-.723919l.01442-.272567 2.877087-.01456c1.582397-.008 2.908201.0057 2.946228.03029.03802.02466.388338 1.066959.778468 2.31622.390129 1.249262.731878 2.312269.75944 2.36224.06911.125307.04193.205579 1.328028-3.921923l.25007-.802557h1.543838c1.200013 0 1.550475.0173 1.573644.07768.0164.04272-.362935 1.085288-.842955 2.316811-1.626209 4.172154-2.223047 5.629169-2.350076 5.737067-.111539.09474-.28418.106-1.625628.106-1.339503 0-1.514799-.0114-1.630732-.106-.08158-.06657-.339788-.646797-.694092-1.559683-.310308-.799528-.902219-2.325898-1.315358-3.391934l-.75116-1.938249-.03943.333137c-.02169.183226-.04213 1.116765-.04542 2.074531l-.006 1.741395h.486462c.393449 0 .493695.01884.524286.09857.07521.195985-.805435 2.584236-1.018965 2.763379-.111405.09347-.27453.106-1.379496.106-.893912 0-1.273986-.02083-1.325834-.07269zm-.100456-3.818953c-.07421-1.232975-.40427-1.620255-1.380858-1.620255-.564465 0-.795861.08975-1.100352.426785-.37691.417193-.408412.943365-.08187 1.367273.321557.417426.593813.496344 1.734341.502737l.869746.0049z"
                fill="#fff"
            />
            <path
                d="M24.896116 23.30368c-.04194-.04194-.07269-.24286-.07269-.475052 0-.744952-.07907-1.880805-.127549-1.832308-.02644.02644-.239931.511452-.474421 1.077784-.23449.566332-.472751 1.063765-.529468 1.105407-.14277.104822-.836483.09533-1.399925-.01914-.735181-.149378-1.39679-.500665-1.9288-1.024116l-.450832-.443584-.272385.582887c-.429421.918938-.301397.858529-1.819464.858529-.963986 0-1.300457-.01906-1.337129-.07571-.02695-.04164-.07625-1.073239-.109577-2.292436-.04963-1.816605-.07697-2.236567-.151426-2.326656-.190774-.230832-.559472-.32971-1.385272-.371504l-.795257-.04026v2.518668c0 2.208938-.0117 2.530373-.09518 2.61385-.14213.14213-2.635448.14213-2.777578 0-.08346-.08347-.09518-.404065-.09518-2.604522v-2.509334h-.514845c-.451062 0-.514486-.01313-.511929-.106.0016-.0583.244061-.705643.538792-1.438543l.535875-1.332546 1.376713-.0163c.964517-.01142 1.401658.0044 1.460025.05284.0647.0537.08352.300928.08424 1.106563.000509.570581.02388 1.073618.05192 1.117859.05052.07969.097-.0201.813345-1.74612l.263951-.635988 1.146036.000425c1.269205.00047 1.548377.05549 2.021787.398421.47441.343661.849463 1.126662.85143 1.777534.0016.511948.08364.514209.268487.0074.518716-1.422232 1.597353-2.214061 3.016015-2.214061.98037 0 1.83225.484771 2.169024 1.234304l.105551.234945.0396-.598317c.02178-.329073.04503-.652829.05167-.719457.01184-.119044.06181-.121391 2.889144-.13569 1.582398-.008 2.908023.0057 2.945835.03029.03781.02466.345915.930676.684676 2.013369.84883 2.712897.859018 2.742843.913697 2.685618.0267-.02794.257185-.718599.512185-1.534784.255002-.816183.585437-1.872377.734304-2.347096l.270665-.863127h1.538798c1.011659 0 1.552295.02183 1.578197.06375.04575.07402-.274897.921995-1.888364 4.993867-.734792 1.85438-1.223323 3.007713-1.302068 3.07394-.112573.09468-.285569.106-1.6201.106-1.234423 0-1.51676-.0159-1.624647-.09147-.139159-.09747-.151786-.128134-1.695861-4.118171-1.193832-3.084979-1.062196-2.809088-1.112658-2.331955-.0229.216538-.04482 1.136449-.04872 2.044246l-.0071 1.650539h.486462c.394961 0 .493632.01868.524577.09932.07679.200104-.801083 2.582074-1.018159 2.762625-.112329.09342-.276045.106-1.380593.106-.893912 0-1.273986-.02083-1.325834-.07269zm-.07432-3.334392c-.000902-.108267-.02612-.449926-.05604-.759237-.09672-.999718-.44265-1.346898-1.339405-1.344249-.544953.0016-.864342.129361-1.130412.45215-.418309.507481-.367016 1.096451.13378 1.536156.30009.263483.449738.292053 1.591172.303785l.802557.0082z"
                fill="#fff"
            />
            <path
                d="M24.898097 23.300651c-.03372-.04164-.08108-.573145-.105245-1.181119-.02417-.607974-.06302-1.105408-.08634-1.105408-.02332 0-.231104.456228-.461737 1.01384-.230632.557613-.46735 1.061859-.526041 1.12055-.0817.0817-.206698.106712-.533256.106712-1.068431 0-2.040914-.380037-2.809708-1.098007-.254532-.237703-.471796-.421788-.482813-.409076-.011.01271-.133914.267943-.273109.56718-.406261.873379-.286493.818761-1.795424.818761-.954267 0-1.30008-.01945-1.345752-.07571-.03679-.04531-.07711-.853934-.100434-2.013961-.02142-1.066036-.05478-2.072119-.07412-2.235739-.065-.54996-.315336-.671674-1.520214-.739126l-.741986-.04153v2.518427c0 2.208719-.0117 2.530132-.09518 2.613609-.14213.14213-2.635448.14213-2.777578 0-.08347-.08347-.09518-.404063-.09518-2.604521v-2.50935h-.51484c-.450925 0-.51453-.01317-.512289-.106.0014-.0583.243598-.705643.538201-1.438543l.535643-1.332546 1.377305-.0163c.964959-.01142 1.402246.0044 1.460616.05284.06452.05354.08352.296345.08424 1.076279.000509.553924.02658 1.047703.05792 1.097286.06193.09796.02929.16564.699853-1.451185l.365-.880066 1.179542.0038c1.077207.0034 1.209837.0157 1.528764.140988.432394.169869.672509.368018.922969.761661.252045.396137.347258.692828.389432 1.213516.01889.233195.05781.423991.0865.423991.02869 0 .112477-.166597.186205-.370215.393823-1.087636 1.183392-1.849878 2.186968-2.111275.725438-.188954 1.610695-.08792 2.187915.249685.334603.195708.712923.61349.815681.900765.08191.229011.08374.222789.14354-.490478l.06057-.722432 2.877086-.01456c1.582398-.008 2.908413.0057 2.946698.03029.03829.02466.383579 1.039702.767316 2.25565.383737 1.215948.724461 2.278956.757163 2.362239.07712.196415.01349.370197.865031-2.362239l.707861-2.271384 1.552527-.01617c1.256811-.01309 1.558489-.000632 1.583827.0654.06169.16077-3.004346 7.893388-3.192693 8.052041-.112405.09469-.2853.106-1.619905.106-1.234507 0-1.516756-.01589-1.624662-.09148-.138414-.09694-.23566-.333292-1.756792-4.269585-.48276-1.249263-.909001-2.325898-.947201-2.392526-.09799-.170903-.145813.586751-.153896 2.437953l-.0064 1.468828h.486462c.394962 0 .493633.01868.524577.09932.0805.209794-.814937 2.627538-1.028555 2.777164-.174665.122339-2.596276.136494-2.694049.01574zm-.106234-3.72507c-.05209-.791371-.157641-1.15134-.409044-1.39501-.246817-.239224-.493659-.316099-1.014986-.316099-.482389 0-.843075.163447-1.11513.505327-.165209.20761-.185222.27684-.185222.640702 0 .354045.02255.437493.170601.631612.340379.446259.53879.502606 1.816729.515936l.775926.0081z"
                fill="#fff"
            />
        </svg>
    );
};

export { NavIkon };
