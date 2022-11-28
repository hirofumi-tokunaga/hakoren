
export default function PostPut() {
	return (
		<form action="https://www.hakoren.net/booking/" method="post">
			<h2 className="flex">
					</h2>
					<div className="search-box-wrap">
						<div className="box-dep">
							<dl>
								<dt className="ttl">出発日</dt>
								<dd>
									<input name="data[topSearch][date]" type="text" className="cal-dep form-view" id="cal-dep" readonly="readonly" value="" />
										<select name="data[topSearch][time]" className="form-view" id="topSearchTime">
											<option value="09:00">09:00</option>
											<option value="09:30">09:30</option>
											<option value="10:00">10:00</option>
											<option value="10:30">10:30</option>
											<option value="11:00" selected="selected">11:00</option>
											<option value="11:30">11:30</option>
											<option value="12:00">12:00</option>
											<option value="12:30">12:30</option>
											<option value="13:00">13:00</option>
											<option value="13:30">13:30</option>
											<option value="14:00">14:00</option>
											<option value="14:30">14:30</option>
											<option value="15:00">15:00</option>
											<option value="15:30">15:30</option>
											<option value="16:00">16:00</option>
											<option value="16:30">16:30</option>
											<option value="17:00">17:00</option>
											<option value="17:30">17:30</option>
											<option value="18:00">18:00</option>
											<option value="18:30">18:30</option>
											<option value="19:00">19:00</option>
										</select>
								</dd>
							</dl>
						</div>
						<div className="box-arv">
							<dl>
								<dt className="ttl">返却日</dt>
								<dd>
									<input name="data[topSearch][dateE]" type="text" className="cal-arv form-view" id="cal-arv" readonly="readonly" value="" />
										<select name="data[topSearch][timeE]" className="form-view" id="topSearchTimeE">
											<option value="09:00">09:00</option>
											<option value="09:30">09:30</option>
											<option value="10:00">10:00</option>
											<option value="10:30">10:30</option>
											<option value="11:00">11:00</option>
											<option value="11:30">11:30</option>
											<option value="12:00">12:00</option>
											<option value="12:30">12:30</option>
											<option value="13:00">13:00</option>
											<option value="13:30">13:30</option>
											<option value="14:00">14:00</option>
											<option value="14:30">14:30</option>
											<option value="15:00">15:00</option>
											<option value="15:30">15:30</option>
											<option value="16:00">16:00</option>
											<option value="16:30">16:30</option>
											<option value="17:00" selected="selected">17:00</option>
											<option value="17:30">17:30</option>
											<option value="18:00">18:00</option>
											<option value="18:30">18:30</option>
											<option value="19:00">19:00</option>
										</select>
								</dd>
							</dl>
						</div>
						<div className="box-dep-shop">
							<dl>
								<dt className="ttl">出発場所</dt>
								<dd>
									<select name="data[topSearch][start_office_id]" className="form-view" id="topSearchStartOfficeId">
										<option value="">---</option>
										<option value="1">福岡空港店</option>
										<option value="2">那覇空港店</option>
										<option value="3">鹿児島空港店</option>
									</select>
								</dd>
							</dl>
						</div>
						<div className="box-cartype">
							<dl>
								<dt className="ttl">車両タイプ</dt>
								<dd>
									<select name="data[topSearch][usage]" className="form-view" id="topSearchUsage">
										<option value="">指定なし</option>
										<option value="1">軽自動車</option>
										<option value="2">コンパクト</option>
										<option value="5">エコカー</option>
										<option value="8">ミニバン/ワンボックス</option>
										<option value="15">RV/SUV</option>
										<option value="3">セダン</option>
										<option value="13">キャンピングカー</option>
										<option value="6">トラック</option>
										<option value="10">福祉車両</option>
										<option value="14">その他</option>
									</select>
								</dd>
							</dl>
						</div>
					</div>
					<div className="btn-more-wp">
						<button type="submit" className="basic-btn">この条件で検索する</button>
					</div>
				</form>
	)
}
