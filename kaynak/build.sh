#!/bin/sh
# Kaynak parçalarını birleştirip depo kökündeki index.html'i üretir.
cd "$(dirname "$0")"
cat m_head.html k_chars.js m_data.js m_deco.js m_state.js m_buy.js m_sim.js m_ui.js m_event.js m_v9.js m_v10.js k_intro.js m_cut.js bg_new.js m_draw.js > ../index.html
printf '</script>\n</body>\n</html>\n' >> ../index.html
echo "index.html hazır"
