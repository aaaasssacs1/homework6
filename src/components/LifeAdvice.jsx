import React from 'react'

function clothingSuggestion(temp) {
  if (Number.isNaN(temp) || temp === null) return '温度未知，请根据实际着装。'
  if (temp >= 28) return '天气炎热：建议穿轻薄、透气的衣物，注意防晒和补水。'
  if (temp >= 18) return '较为温暖：短袖/薄外套即可，早晚可备一件外套。'
  if (temp >= 8) return '偏凉：建议穿秋装或薄毛衣，并备风衣或夹克。'
  return '寒冷：请穿保暖外套、围巾和手套，注意防风保暖。'
}

function travelSuggestion(condition = '') {
  if (!condition) return '出行：情况未知，请关注实时路况和天气预报。'
  if (condition.includes('雨') || condition.includes('雪')) return '出行：可能有降水，建议携带雨具，路面湿滑请减速慢行。'
  if (condition.includes('雾') || condition.includes('霾')) return '出行：能见度较低，外出请注意安全，必要时使用公共交通。'
  if (condition.includes('雷')) return '出行：有雷电风险，尽量避免户外高处活动。'
  return '出行：天气良好，出门前关注短时降水和路况即可。'
}

function exerciseSuggestion(temp, humidity, condition = '') {
  // 简单规则：极端或湿度很高不建议剧烈户外运动
  if (Number.isNaN(temp) || temp === null) return '运动：建议根据自身感觉选择强度，注意补水。'
  if (condition.includes('雨') || condition.includes('雪') || condition.includes('雷')) return '运动：降水或雷电，不建议户外剧烈运动，选择室内锻炼更安全。'
  if (humidity != null && humidity >= 90) return '运动：湿度很高，体感闷热，建议减小强度或室内运动。'
  if (temp < 0) return '运动：非常寒冷，建议在室内进行适度运动以避免受冻。'
  if (temp <= 10) return '运动：较冷，做好热身并穿戴保暖，选择短时高强度或室内运动。'
  if (temp > 35) return '运动：高温环境不适合剧烈运动，注意防暑和充分补水。'
  return '运动：气象条件适宜，适合户外活动，保持适度并注意补水。'
}

export default function LifeAdvice({ temperature, humidity, condition }) {
  const styles = {
    container: { padding: 14, borderRadius: 12, background: '#fff', border: '1px solid #f1f5f9', maxWidth: 720 },
    heading: { fontSize: 15, fontWeight: 700, marginBottom: 10 },
    row: { display: 'flex', gap: 12, flexWrap: 'wrap' },
    card: { flex: '1 1 220px', minWidth: 200, padding: 10, borderRadius: 10, background: 'linear-gradient(180deg,#ffffff,#fbfdff)', border: '1px solid rgba(2,6,23,0.03)' },
    title: { fontSize: 13, fontWeight: 700, marginBottom: 6 },
    text: { fontSize: 13, color: '#475569' },
  }

  const tempVal = Number.isFinite(temperature) ? temperature : null
  const humVal = Number.isFinite(humidity) ? humidity : null

  return (
    <section aria-label="生活建议" style={styles.container}>
      <div style={styles.heading}>生活建议</div>
      <div style={styles.row}>
        <div style={styles.card}>
          <div style={styles.title}>穿衣建议</div>
          <div style={styles.text}>{clothingSuggestion(tempVal)}</div>
        </div>

        <div style={styles.card}>
          <div style={styles.title}>出行建议</div>
          <div style={styles.text}>{travelSuggestion(condition || '')}</div>
        </div>

        <div style={styles.card}>
          <div style={styles.title}>运动建议</div>
          <div style={styles.text}>{exerciseSuggestion(tempVal, humVal, condition || '')}</div>
        </div>
      </div>
    </section>
  )
}
