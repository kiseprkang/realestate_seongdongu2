import { useState, useEffect } from 'react'
import './App.css'

const sections = [
  { id: 'cover', label: '표지' },
  { id: 'overview', label: '기본개요' },
  { id: 'maps', label: '동별 지도' },
  { id: 'jobs', label: '직장' },
  { id: 'transport', label: '교통' },
  { id: 'schools', label: '학군' },
  { id: 'environment', label: '환경' },
  { id: 'supply', label: '공급·호재' },
  { id: 'market', label: '시장' },
  { id: 'complexes', label: '단지분석' },
  { id: 'conclusion', label: '결론' },
]

function App() {
  const [activeSection, setActiveSection] = useState('cover')
  const [navOpen, setNavOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.25 }
    )
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setNavOpen(false)
  }

  const handlePrint = () => window.print()

  return (
    <div className="app">
      {/* Side Navigation */}
      <nav className={`sidebar ${navOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-brand">금호·옥수</span>
          <span className="sidebar-sub">입지 분석</span>
        </div>
        <ul className="nav-list">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <button
                className={`nav-item ${activeSection === id ? 'active' : ''}`}
                onClick={() => scrollTo(id)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
        <div className="sidebar-footer">
          <button className="btn-pdf" onClick={handlePrint}>
            PDF 다운로드
          </button>
        </div>
      </nav>

      {/* Top bar (mobile + dark mode toggle) */}
      <header className="topbar">
        <button className="nav-toggle" onClick={() => setNavOpen(!navOpen)} aria-label="메뉴">
          {navOpen ? '✕' : '☰'}
        </button>
        <span className="topbar-title">성동구 금호·옥수 입지 분석</span>
        <div className="topbar-right">
          <button className="btn-pdf topbar-pdf" onClick={handlePrint}>PDF 다운로드</button>
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="다크/라이트 모드"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">

        {/* 1. Cover */}
        <section id="cover" className="section cover-section">
          <div className="cover-content">
            <div className="cover-eyebrow">서울시 성동구 부동산 스터디 · 2026</div>
            <h1 className="cover-title">금호 · 옥수</h1>
            <p className="cover-subtitle">서울시 성동구 입지 분석 보고서</p>
            <p className="cover-tagline">강남 배후 최상급 주거지 심층 분석</p>
            <div className="cover-tags">
              {['직장', '교통', '학군', '환경', '공급·호재', '시장가격', '단지분석'].map(t => (
                <span key={t} className="cover-tag">{t}</span>
              ))}
            </div>
            <div className="cover-meta">
              <div className="cover-date">발표일시 · 2026년 3월 8일</div>
              <div className="cover-presenters">발표자 · 최재혁 &nbsp;|&nbsp; 강승훈 &nbsp;|&nbsp; 정진우</div>
            </div>
          </div>
          <button className="cover-scroll" onClick={() => scrollTo('overview')}>
            아래로 스크롤 ↓
          </button>
        </section>

        {/* 2. 기본개요 */}
        <section id="overview" className="section">
          <div className="section-inner">
            <div className="section-num">01</div>
            <h2 className="section-title">기본개요</h2>
            <div className="cards-grid">
              <div className="card">
                <div className="card-icon">📍</div>
                <h3>위치</h3>
                <p>성동구 <strong>남서쪽</strong> 위치<br/>인구 성동구의 <strong>25%</strong><br/>면적 성동구의 <strong>23%</strong></p>
              </div>
              <div className="card">
                <div className="card-icon">🏠</div>
                <h3>주거 특성</h3>
                <p><strong>주거 밀집지역</strong><br/>한강에 접해 한강뷰 아파트 다수<br/>대부분 구축 아파트</p>
              </div>
              <div className="card">
                <div className="card-icon">🌆</div>
                <h3>별명</h3>
                <p><strong>"뒷구정"</strong><br/>압구정이 인접하여<br/>강남 생활권 공유</p>
              </div>
              <div className="card">
                <div className="card-icon">🏙️</div>
                <h3>성격</h3>
                <p><strong>고급 베드타운</strong><br/>강남·CBD 고소득 직장인의<br/>최상급 주거지</p>
              </div>
            </div>
            <div className="insight-box">
              <div className="insight-label">핵심 인사이트</div>
              <p>옥수동·금호동은 <strong>'강남 배후 주거지(베드타운)의 정석'</strong>으로 불리는 곳. 자체 대형 일자리는 없으나, 강남·광화문 고소득 직장인의 실거주 수요가 부동산 가치를 완벽하게 지탱.</p>
            </div>
          </div>
        </section>

        {/* 3. 동별 지도 */}
        <section id="maps" className="section alt-section">
          <div className="section-inner">
            <div className="section-num">02</div>
            <h2 className="section-title">동별 지도</h2>
            <div className="maps-grid">
              <div className="map-card">
                <img src="/images/img_map_seongdong.png" alt="성동구 전체" loading="lazy" />
                <div className="map-label">성동구 전체</div>
              </div>
              <div className="map-card">
                <img src="/images/img_map_oksu.png" alt="옥수동" loading="lazy" />
                <div className="map-label">옥수동</div>
              </div>
              <div className="map-card">
                <img src="/images/img_map_geumho1.png" alt="금호1가동" loading="lazy" />
                <div className="map-label">금호1가동</div>
              </div>
              <div className="map-card">
                <img src="/images/img_map_geumho23.png" alt="금호2·3가동" loading="lazy" />
                <div className="map-label">금호2·3가동</div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. 직장 */}
        <section id="jobs" className="section">
          <div className="section-inner">
            <div className="section-num">03</div>
            <h2 className="section-title">직장</h2>

            <h3 className="sub-title">성동구 전체 사업체 현황</h3>
            <div className="stat-row">
              <div className="stat-card">
                <div className="stat-num">39,264개</div>
                <div className="stat-label">사업체 수</div>
                <div className="stat-sub">서울 대비 3.3%</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">201,023명</div>
                <div className="stat-label">종사자 수</div>
                <div className="stat-sub">서울 대비 3.5%</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">서울 11위</div>
                <div className="stat-label">종사자수 순위</div>
                <div className="stat-sub">사업체수 14위</div>
              </div>
            </div>

            <img src="/images/img01_business.png" alt="성동구 사업체 현황" className="full-img" loading="lazy" />

            <h3 className="sub-title">금호·옥수 동별 입지 종합 데이터</h3>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>동</th>
                    <th>지하철역</th>
                    <th>직장인구</th>
                    <th>사업체 수</th>
                    <th>종사자 수</th>
                    <th>광화문</th>
                    <th>여의도</th>
                    <th>강남</th>
                    <th>경사도</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>금호1가</strong></td>
                    <td>신금호 (5호선)</td>
                    <td>1,732명</td>
                    <td>914개</td>
                    <td>2,156명</td>
                    <td><span className="badge-s">9분 무환승</span></td>
                    <td>22분</td>
                    <td>10분</td>
                    <td>1.8°</td>
                  </tr>
                  <tr>
                    <td><strong>금호2·3가</strong></td>
                    <td>금호+신금호 (3·5호선)</td>
                    <td>244명</td>
                    <td>1,489개</td>
                    <td>2,943명</td>
                    <td><span className="badge-s">무환승</span></td>
                    <td>—</td>
                    <td><span className="badge-s">압구정 2정거장</span></td>
                    <td>2.5°</td>
                  </tr>
                  <tr>
                    <td><strong>금호4가</strong></td>
                    <td>금호 (3호선)</td>
                    <td>507명</td>
                    <td>989개</td>
                    <td>2,219명</td>
                    <td>25분 (2환)</td>
                    <td>28분 (2환)</td>
                    <td>35분 (2환)</td>
                    <td>2.2°</td>
                  </tr>
                  <tr>
                    <td><strong>옥수동</strong></td>
                    <td>옥수 (3·6호선)</td>
                    <td>3,197명</td>
                    <td>1,455개</td>
                    <td>4,841명</td>
                    <td>25분 (2환)</td>
                    <td>19분 (2환)</td>
                    <td>35분 (2환)</td>
                    <td>3.0°</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="insight-box warning">
              <div className="insight-label">투자 분석</div>
              <p>금호·옥수는 성동구 內 고용규모 비중 약 <strong>6%</strong>로 사실상 <strong>주거형 상권</strong>. 내부 일자리가 아닌 강남(GBD)·광화문(CBD)으로 출퇴근하는 고소득 직장인의 <strong>실거주 수요</strong>가 부동산 가치를 지탱.</p>
            </div>

            <h3 className="sub-title">연봉 현황</h3>
            <img src="/images/img_salary.png" alt="연봉 현황" className="full-img" loading="lazy" />
          </div>
        </section>

        {/* 5. 교통 */}
        <section id="transport" className="section alt-section">
          <div className="section-inner">
            <div className="section-num">04</div>
            <h2 className="section-title">교통</h2>

            <div className="grade-legend">
              <span className="gl-label">입지 등급 기준</span>
              <span className="gl-item"><span className="grade s">S</span> 강남 30분 이내</span>
              <span className="gl-item"><span className="grade a">A</span> 강남 1시간, 부도심 30분</span>
              <span className="gl-item"><span className="grade b">B</span> 부도심 1시간</span>
              <span className="gl-item"><span className="grade c">C</span> 그 외</span>
            </div>

            <h3 className="sub-title">역별 주요 업무지구 소요 시간</h3>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>역</th>
                    <th>강남</th>
                    <th>여의도</th>
                    <th>광화문/을지로</th>
                    <th>가산</th>
                    <th>판교</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>신금호역/행당역</strong></td>
                    <td><span className="grade b">28분</span></td>
                    <td><span className="grade b">23분</span></td>
                    <td><span className="grade s">10분</span></td>
                    <td>50분</td>
                    <td>47분</td>
                  </tr>
                  <tr>
                    <td><strong>옥수역 (3호선)</strong></td>
                    <td><span className="grade s">22분</span></td>
                    <td><span className="grade b">35분</span></td>
                    <td><span className="grade s">13분</span></td>
                    <td>45분</td>
                    <td>40분</td>
                  </tr>
                  <tr>
                    <td><strong>왕십리역</strong></td>
                    <td><span className="grade s">17분</span></td>
                    <td><span className="grade b">26분</span></td>
                    <td><span className="grade s">13분</span></td>
                    <td>40분</td>
                    <td>36분</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="sub-title">동별 업무지구 접근성 평가</h3>
            <div className="transport-grid">
              {[
                {
                  area: '옥수동 (3호선)',
                  rows: [
                    { dest: '강남 GBD', grade: 's', time: '지하철 13~15분, 차 5~10분' },
                    { dest: 'CBD 광화문', grade: 'a', time: '지하철 10~17분' },
                    { dest: '여의도 YBD', grade: 'b', time: '지하철 30분' },
                  ]
                },
                {
                  area: '금호1가동 (5호선)',
                  rows: [
                    { dest: '강남 GBD', grade: 'b', time: '지하철 30~45분' },
                    { dest: 'CBD 광화문', grade: 's', time: '환승없이 12~15분' },
                    { dest: '여의도 YBD', grade: 's', time: '환승없이 20~25분' },
                  ]
                },
                {
                  area: '금호2·3가동 (3·5호선)',
                  rows: [
                    { dest: '강남 GBD', grade: 's', time: '3호선 압구정 2정거장(4분)' },
                    { dest: 'CBD 광화문', grade: 's', time: '3호선 환승없이 10~15분' },
                    { dest: '여의도 YBD', grade: 'b', time: '환승 필요 35~40분' },
                  ]
                },
              ].map(({ area, rows }) => (
                <div key={area} className="transport-card">
                  <div className="transport-area">{area}</div>
                  {rows.map(({ dest, grade, time }) => (
                    <div key={dest} className="transport-row">
                      <span className="tr-dest">{dest}</span>
                      <span className={`grade ${grade}`}>{grade.toUpperCase()}급</span>
                      <span className="tr-time">{time}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="insight-box">
              <div className="insight-label">종합 평가</div>
              <p>강남역·여의도·광화문 기준 <strong>S급 지역</strong>에 해당하는 성동구 금호·옥수. 3호선/5호선 이중 인프라로 별도 교통 호재 없이도 최상위 교통 입지 확보.</p>
            </div>
          </div>
        </section>

        {/* 6. 학군 */}
        <section id="schools" className="section">
          <div className="section-inner">
            <div className="section-num">05</div>
            <h2 className="section-title">학군</h2>

            <div className="school-grid">
              <div className="school-col">
                <h3 className="sub-title">초등학교</h3>
                <img src="/images/img_school_elem.png" alt="초등학교" className="full-img" loading="lazy" />
                <div className="school-items">
                  <div className="school-item">
                    <strong>옥수동</strong> — 서울옥정초 (1곳)
                  </div>
                  <div className="school-item">
                    <strong>금호동</strong> — 서울금옥초, 서울옥수초, 서울금호초 (3곳)
                  </div>
                </div>
                <div className="insight-box mini">금호1가 e편한세상신금호 — <strong>초품아</strong> 입지로 영유아 수요 절대적 선호</div>
              </div>

              <div className="school-col">
                <h3 className="sub-title">중학교</h3>
                <img src="/images/img_school_mid.png" alt="중학교" className="full-img" loading="lazy" />
                <div className="school-items">
                  <div className="school-item good">
                    <strong>옥정중학교</strong> — 1등급
                    <div className="school-detail">
                      자사고 진학률 19.9% (상위 12%)<br/>
                      과학고 진학률 1.6% (상위 7%)<br/>
                      학급당 25명 / 총 505명
                    </div>
                  </div>
                  <div className="school-item">
                    <strong>대경중, 금호여중, 무학중</strong><br/>금호1가 배정
                  </div>
                  <div className="school-item">
                    <strong>광희중, 금호여중</strong><br/>금호2·3가 배정
                  </div>
                </div>
              </div>

              <div className="school-col">
                <h3 className="sub-title">고등학교 (취약점)</h3>
                <div className="school-items">
                  <div className="school-item bad">
                    <strong>금호고</strong> (유일) — 등급 4.9
                    <div className="school-detail">
                      4년제 대학 진학률 34.8%<br/>
                      전문대 진학률 31%<br/>
                      서울 상위 97%, 전국 상위 98%
                    </div>
                  </div>
                </div>
                <div className="insight-box warning mini">
                  <strong>절대적 약점:</strong> 고등학교 부재로 대치동·반포동 <strong>이탈 수요 발생</strong>
                </div>

                <h3 className="sub-title" style={{ marginTop: '28px' }}>학원가</h3>
                <div className="insight-box">
                  <p>행당동이 가장 큰 학원가. 대부분 주민은 동호대교를 건너 <strong>압구정 학원가</strong> 이용. 옥수동 학원은 초·중등 대상 영어·수학·예체능 학원 중심.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. 환경 */}
        <section id="environment" className="section alt-section">
          <div className="section-inner">
            <div className="section-num">06</div>
            <h2 className="section-title">환경</h2>

            <div className="env-grid">
              <div className="env-card">
                <div className="env-icon">🏥</div>
                <h3>병원</h3>
                <div className="env-item">
                  <strong>순천향대학교 병원</strong><br/>
                  한강진역 인근 · <span className="time-tag">대중교통 30분 미만</span>
                </div>
                <div className="env-item">
                  <strong>한양대학교 병원</strong><br/>
                  왕십리역 인근 · <span className="time-tag">대중교통 35분 내외</span>
                </div>
              </div>

              <div className="env-card">
                <div className="env-icon">🛒</div>
                <h3>쇼핑</h3>
                <div className="env-item bad-env"><strong>인근 대형마트·백화점 없음</strong></div>
                <div className="env-item">
                  <strong>이마트</strong> — 왕십리역 · <span className="time-tag">대중교통 20분</span>
                </div>
                <div className="env-item good-env">
                  <strong>현대백화점·갤러리아</strong><br/>
                  압구정 (동호대교 건너편) · <span className="time-tag good">대중교통 10분 미만</span>
                </div>
              </div>

              <div className="env-card">
                <div className="env-icon">🌳</div>
                <h3>자연환경</h3>
                <div className="env-item good-env">
                  <strong>배산임수의 정석</strong><br/>
                  남쪽 한강 · 북쪽 매봉산<br/>
                  매봉산 공원, 응봉산, 달맞이 근린공원
                </div>
                <div className="env-item">
                  서울 한복판에서 <strong>산+강</strong> 동시 향유<br/>
                  <span className="badge-warn">단, 가파른 경사지</span>
                </div>
              </div>

              <div className="env-card">
                <div className="env-icon">🍽️</div>
                <h3>상권</h3>
                <div className="env-item good-env">
                  <strong>독서당로 상권</strong> (옥수동)<br/>
                  고급 베이커리·카페·식당<br/>
                  한남동~옥수~금호 연결
                </div>
                <div className="env-item">
                  <strong>금남시장</strong> (금호2·3가동)<br/>
                  풍부한 식자재·먹거리<br/>최근 젊은 감각 상권 유입
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. 공급·호재 */}
        <section id="supply" className="section">
          <div className="section-inner">
            <div className="section-num">07</div>
            <h2 className="section-title">공급 · 호재</h2>

            <h3 className="sub-title">성동구 입주 예정 물량</h3>
            <img src="/images/img_supply_seongdong.png" alt="성동구 입주 예정" className="full-img" loading="lazy" />
            <div className="supply-list">
              <div className="supply-item">
                <div className="supply-year">2027</div>
                <div className="supply-name">청계 리버뷰자이</div>
                <div className="supply-units">1,670세대</div>
              </div>
              <div className="supply-item">
                <div className="supply-year">2027</div>
                <div className="supply-name">오티에르포레</div>
                <div className="supply-units">287세대</div>
              </div>
            </div>

            <h3 className="sub-title">주요 호재 — 정비사업 현황</h3>
            <img src="/images/img_prospect_map.png" alt="호재 지도" className="full-img" loading="lazy" />

            <div className="prospect-grid">
              <div className="prospect-card stage-late">
                <div className="prospect-stage">관리처분인가</div>
                <div className="prospect-name">금호 16구역</div>
                <p>금호역 초역세권 알짜 구역. 철거·착공 앞둔 사업 막바지 단계. 불확실성 거의 해소.</p>
              </div>
              <div className="prospect-card stage-mid">
                <div className="prospect-stage">사업시행인가</div>
                <div className="prospect-name">한남하이츠 재건축</div>
                <p>GS건설 '한남자이 더 리버' 시공 예정. 옥수동 천장을 뚫어줄 핵심 하이엔드 단지.</p>
              </div>
              <div className="prospect-card stage-mid">
                <div className="prospect-stage">시공사 선정</div>
                <div className="prospect-name">금호 21구역</div>
                <p>서울시 신속통합기획 선정. 한강 조망 대단지 신축 변모 잠재력.</p>
              </div>
              <div className="prospect-card stage-early">
                <div className="prospect-stage">건축심의 단계</div>
                <div className="prospect-name">옥수극동 리모델링</div>
                <p>수직·수평 증축 리모델링 추진. 조합 설립 및 심의 단계 진행 중.</p>
              </div>
              <div className="prospect-card stage-early">
                <div className="prospect-stage">리모델링 추진</div>
                <div className="prospect-name">금호벽산 (1,707세대)</div>
                <p>1991년 준공 매머드급 단지. 성공 시 신금호역 주거 벨트 도약 기대.</p>
              </div>
            </div>

            <div className="insight-box">
              <div className="insight-label">공급 분석</div>
              <p>금호·옥수는 이미 대규모 재개발이 완료되어 향후 신축 입주 물량이 <strong>극히 제한적</strong>. 수요 대비 공급 부족 구조로 <strong>전세가율이 탄탄</strong>하게 받쳐주는 안정적 시장.</p>
            </div>
          </div>
        </section>

        {/* 9. 시장 강도·가격 */}
        <section id="market" className="section alt-section">
          <div className="section-inner">
            <div className="section-num">08</div>
            <h2 className="section-title">시장 강도 · 가격</h2>

            <h3 className="sub-title">시장 강도 (매매·전세)</h3>
            <div className="market-highlight">
              <div className="market-item">
                <div className="market-type">매매 강도 강한 동</div>
                <div className="area-tags">
                  {['응봉동', '금호4가동', '행당동'].map(a => <span key={a} className="area-tag strong">{a}</span>)}
                  {['금호1동', '금호2동'].map(a => <span key={a} className="area-tag">{a}</span>)}
                </div>
              </div>
              <div className="market-item">
                <div className="market-type">전세 강도 강한 동</div>
                <div className="area-tags">
                  {['응봉동', '금호4가동', '행당동'].map(a => <span key={a} className="area-tag strong">{a}</span>)}
                </div>
              </div>
            </div>
            <img src="/images/img_market_strength.png" alt="시장 강도" className="full-img" loading="lazy" />

            <h3 className="sub-title">시장 가격 (매매·전세)</h3>
            <div className="market-highlight">
              <div className="market-item">
                <div className="market-type">매매가 상위 동</div>
                <div className="area-tags">
                  {['성수1가', '옥수동', '금호2가'].map(a => <span key={a} className="area-tag strong">{a}</span>)}
                  {['성수2가', '금호4가'].map(a => <span key={a} className="area-tag">{a}</span>)}
                </div>
              </div>
              <div className="market-item">
                <div className="market-type">전세가 상위 동</div>
                <div className="area-tags">
                  {['성수1가', '옥수동', '금호2가', '금호4가'].map(a => <span key={a} className="area-tag strong">{a}</span>)}
                </div>
              </div>
            </div>
            <img src="/images/img_market_price.png" alt="시장 가격" className="full-img" loading="lazy" />
          </div>
        </section>

        {/* 10. 단지분석 */}
        <section id="complexes" className="section">
          <div className="section-inner">
            <div className="section-num">09</div>
            <h2 className="section-title">단지분석</h2>
            <p className="section-desc">금호·옥수 34개 아파트 단지를 대장 단지, 호재 단지, 저평가 단지로 분류·분석합니다.</p>

            {/* 대장 단지 */}
            <h3 className="sub-title complex-category top">대장 단지 — 지역 시세를 이끄는 핵심 단지</h3>
            <div className="complex-grid">
              <div className="complex-card tier-top">
                <div className="complex-header">
                  <div className="complex-name">래미안 옥수 리버젠</div>
                  <div className="complex-badge">대장</div>
                </div>
                <div className="complex-info">
                  <span>옥수동</span><span>811세대</span><span>삼성물산</span><span>2012년</span>
                </div>
                <p className="complex-desc">옥수동 대장 단지. 한강 직접 조망 + 3·6호선 옥수역 역세권. 지역 매매가 기준점 역할. 전용 84㎡ 기준 시세 선도.</p>
                <div className="complex-points">
                  <span className="cp good">한강뷰</span>
                  <span className="cp good">이중역세권</span>
                  <span className="cp good">브랜드</span>
                </div>
              </div>
              <div className="complex-card tier-top">
                <div className="complex-header">
                  <div className="complex-name">e편한세상 금호 파크힐스</div>
                  <div className="complex-badge">대장</div>
                </div>
                <div className="complex-info">
                  <span>금호1가</span><span>676세대</span><span>대림산업</span>
                </div>
                <p className="complex-desc">신금호역 역세권 금호1가동 대장 단지. 5호선 광화문 직결. 초등학교 인접 초품아 입지로 영유아 가구 최선호.</p>
                <div className="complex-points">
                  <span className="cp good">초품아</span>
                  <span className="cp good">5호선 직결</span>
                  <span className="cp good">신금호역</span>
                </div>
              </div>
              <div className="complex-card tier-top">
                <div className="complex-header">
                  <div className="complex-name">신금호 파크자이</div>
                  <div className="complex-badge">대장</div>
                </div>
                <div className="complex-info">
                  <span>금호1가</span><span>355세대</span><span>GS건설</span>
                </div>
                <p className="complex-desc">GS건설 자이 브랜드. 신금호역 초역세권. 소규모지만 브랜드 프리미엄으로 금호1가 최고가 단지군.</p>
                <div className="complex-points">
                  <span className="cp good">초역세권</span>
                  <span className="cp good">자이 브랜드</span>
                </div>
              </div>
            </div>

            {/* 호재 단지 */}
            <h3 className="sub-title complex-category prospect">호재 단지 — 재건축·리모델링 추진으로 가치 상승 기대</h3>
            <div className="complex-grid">
              <div className="complex-card tier-prospect">
                <div className="complex-header">
                  <div className="complex-name">한남하이츠</div>
                  <div className="complex-badge prospect">사업시행인가</div>
                </div>
                <div className="complex-info">
                  <span>옥수동</span><span>재건축</span><span>GS건설 예정</span>
                </div>
                <p className="complex-desc">'한남자이 더 리버' 시공 예정. 사업시행인가 단계로 불확실성 상당 부분 해소. 옥수동 시세 천장을 한 단계 끌어올릴 핵심 하이엔드 재건축 단지.</p>
                <div className="complex-points">
                  <span className="cp prospect">사업시행인가</span>
                  <span className="cp prospect">한강뷰</span>
                  <span className="cp prospect">GS건설</span>
                </div>
              </div>
              <div className="complex-card tier-prospect">
                <div className="complex-header">
                  <div className="complex-name">금호벽산</div>
                  <div className="complex-badge prospect">리모델링 추진</div>
                </div>
                <div className="complex-info">
                  <span>금호1가</span><span>1,707세대</span><span>1991년</span>
                </div>
                <p className="complex-desc">약 1,200세대 리모델링 추진 중. 신금호역 인근 매머드급 단지. 리모델링 성공 시 신금호 주거벨트 전반 시세 도약 기대. 초기 진입 시 가격 메리트 보유.</p>
                <div className="complex-points">
                  <span className="cp prospect">대단지</span>
                  <span className="cp prospect">리모델링</span>
                  <span className="cp prospect">초기진입</span>
                </div>
              </div>
              <div className="complex-card tier-prospect">
                <div className="complex-header">
                  <div className="complex-name">옥수극동</div>
                  <div className="complex-badge prospect">건축심의</div>
                </div>
                <div className="complex-info">
                  <span>옥수동</span><span>리모델링</span>
                </div>
                <p className="complex-desc">리모델링 건축심의 단계 진행. 수직·수평 증축 리모델링으로 세대수 증가 및 주거 품질 향상 기대. 한강 조망 강점 보유 단지.</p>
                <div className="complex-points">
                  <span className="cp prospect">건축심의</span>
                  <span className="cp prospect">한강조망</span>
                </div>
              </div>
              <div className="complex-card tier-prospect">
                <div className="complex-header">
                  <div className="complex-name">금호 16구역 인근</div>
                  <div className="complex-badge prospect">관리처분인가</div>
                </div>
                <div className="complex-info">
                  <span>금호동</span><span>재개발</span>
                </div>
                <p className="complex-desc">금호역 초역세권 정비구역. 관리처분인가 완료로 사업 막바지 단계. 완공 후 주변 단지 시세 동반 상승 기대. 인근 주거 환경 개선 효과.</p>
                <div className="complex-points">
                  <span className="cp prospect">관리처분인가</span>
                  <span className="cp prospect">초역세권</span>
                </div>
              </div>
            </div>

            {/* 저평가 단지 */}
            <h3 className="sub-title complex-category undervalue">저평가 단지 — 현재 가격 대비 입지 가치 고평가 기대</h3>
            <div className="complex-grid">
              <div className="complex-card tier-undervalue">
                <div className="complex-header">
                  <div className="complex-name">옥수중앙하이츠</div>
                  <div className="complex-badge undervalue">저평가</div>
                </div>
                <div className="complex-info">
                  <span>옥수동</span><span>536세대</span><span>1998년</span>
                </div>
                <p className="complex-desc">한강뷰 보유 구축 단지. 옥수동 대장 단지 대비 상대적 저평가. 한강 조망 가구 비율 높고, 옥수역 도보권 입지. 실거주·투자 겸용으로 매력적.</p>
                <div className="complex-points">
                  <span className="cp under">한강뷰</span>
                  <span className="cp under">옥수역 도보</span>
                  <span className="cp under">구축 저평가</span>
                </div>
              </div>
              <div className="complex-card tier-undervalue">
                <div className="complex-header">
                  <div className="complex-name">옥수현대</div>
                  <div className="complex-badge undervalue">저평가</div>
                </div>
                <div className="complex-info">
                  <span>옥수동</span><span>544세대</span><span>구축</span>
                </div>
                <p className="complex-desc">옥수동 구축 단지. 동일 생활권 신축 대비 현저히 낮은 가격. 입지 프리미엄은 동일하게 누리면서 가격 메리트 확보. 전세가율 높아 갭투자 용이.</p>
                <div className="complex-points">
                  <span className="cp under">가격 메리트</span>
                  <span className="cp under">높은 전세가율</span>
                </div>
              </div>
              <div className="complex-card tier-undervalue">
                <div className="complex-header">
                  <div className="complex-name">금호대우</div>
                  <div className="complex-badge undervalue">저평가</div>
                </div>
                <div className="complex-info">
                  <span>금호동</span><span>797세대</span><span>구축</span>
                </div>
                <p className="complex-desc">중대형 구축 단지. 금호동 내 상대적 저평가. 3호선 금호역 접근성 양호. 리모델링·재건축 시 수혜 가능성. 대단지 특성으로 환금성 우수.</p>
                <div className="complex-points">
                  <span className="cp under">중대형</span>
                  <span className="cp under">금호역 근접</span>
                  <span className="cp under">환금성</span>
                </div>
              </div>
              <div className="complex-card tier-undervalue">
                <div className="complex-header">
                  <div className="complex-name">금호두산</div>
                  <div className="complex-badge undervalue">저평가</div>
                </div>
                <div className="complex-info">
                  <span>금호동</span><span>932세대</span><span>구축</span>
                </div>
                <p className="complex-desc">900세대 이상 대단지. 입지 대비 저평가 구간. 금호동 주거환경 개선 호재 수혜 예정. 전용 59·84㎡ 중소형 위주로 실수요 탄탄.</p>
                <div className="complex-points">
                  <span className="cp under">대단지</span>
                  <span className="cp under">중소형 실수요</span>
                  <span className="cp under">호재 수혜</span>
                </div>
              </div>
            </div>

            <div className="insight-box">
              <div className="insight-label">단지분석 종합</div>
              <p><strong>대장 단지</strong>는 시세 기준점 역할을 하며 안정적 실거주 + 환금성이 강점.<br/>
              <strong>호재 단지</strong>는 정비사업 진행 상황에 따른 시세 변동폭이 크므로 사업 단계별 진입 타이밍이 핵심.<br/>
              <strong>저평가 단지</strong>는 동일 입지에서 가격 메리트를 누릴 수 있어 갭투자·장기보유 전략에 적합.</p>
            </div>
          </div>
        </section>

        {/* 11. 결론 */}
        <section id="conclusion" className="section alt-section conclusion-section">
          <div className="section-inner">
            <div className="section-num">10</div>
            <h2 className="section-title">종합 결론</h2>

            <div className="conclusion-grid">
              <div className="conclusion-card positive">
                <div className="conc-icon">✅</div>
                <h3>강점 (Strength)</h3>
                <ul>
                  <li>3호선·5호선 이중 역세권 — 강남·CBD S급 교통</li>
                  <li>한강뷰 + 매봉산 배산임수 자연환경</li>
                  <li>압구정 인접 ("뒷구정") 생활권 공유</li>
                  <li>신축 공급 제한 → 전세가율 방어력 우수</li>
                  <li>금호16구역 등 정비사업 호재 多</li>
                </ul>
              </div>
              <div className="conclusion-card negative">
                <div className="conc-icon">⚠️</div>
                <h3>약점 (Weakness)</h3>
                <ul>
                  <li>고등학교 절대적 부재 → 학군지 이탈</li>
                  <li>대형마트·백화점 없음 (압구정 이용)</li>
                  <li>가파른 경사지 지형</li>
                  <li>자체 대형 일자리 없음</li>
                  <li>구축 아파트 비중 높음</li>
                </ul>
              </div>
              <div className="conclusion-card opportunity">
                <div className="conc-icon">🚀</div>
                <h3>기회 (Opportunity)</h3>
                <ul>
                  <li>한남하이츠 재건축 → 옥수동 시세 천장 상승</li>
                  <li>금호21구역 — 신속통합기획 선정</li>
                  <li>금호벽산 리모델링 성공 시 신금호 도약</li>
                  <li>독서당로 상권 고급화 지속</li>
                  <li>3040 영유아 가구 진입 수요 견고</li>
                </ul>
              </div>
              <div className="conclusion-card target">
                <div className="conc-icon">🎯</div>
                <h3>투자 포인트</h3>
                <ul>
                  <li>옥수동 — 한강뷰 구축 + 한남하이츠 호재 수혜</li>
                  <li>금호2가 — 3호선 압구정 2정거장, 16구역 입주 기대</li>
                  <li>금호1가 — CBD직장인 5호선 실수요 탄탄</li>
                  <li>주목 평형: 전용 59㎡·84㎡ 중소형 환금성 우수</li>
                </ul>
              </div>
            </div>

            <div className="final-message">
              <p>성동구 <strong>금호·옥수</strong>는 단기 시세 차익보다<br/>
              <strong>강남 배후 실거주 수요의 견고함</strong>과<br/>
              <strong>정비사업 호재</strong>를 믿고 장기 보유하는 전략이 유효한 지역입니다.</p>
            </div>

            <div className="cta-row">
              <button className="btn-cta" onClick={handlePrint}>
                보고서 PDF 다운로드
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Mobile nav overlay */}
      {navOpen && <div className="nav-overlay" onClick={() => setNavOpen(false)} />}
    </div>
  )
}

export default App
