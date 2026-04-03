export interface ContributionItem {
  type: 'PR' | 'Issue'
  title: string
  repo: string
  url: string
  state: string
  date: string
  summary: string
}

export const openSourceContributions: ContributionItem[] = [
  {
    type: 'PR',
    title: 'fix: strip model-specific thinking tokens from server responses',
    repo: 'Blaizzy/mlx-vlm',
    url: 'https://github.com/Blaizzy/mlx-vlm/pull/897',
    state: 'Closed',
    date: '2026-04-03',
    summary: '서버 응답에 섞여 나오던 모델별 thinking 토큰을 정리해 실제 사용자 응답 품질을 개선했습니다.',
  },
  {
    type: 'PR',
    title: 'fix: slice per_layer_inputs during chunked prefill for Gemma4 e2b/e4b',
    repo: 'Blaizzy/mlx-vlm',
    url: 'https://github.com/Blaizzy/mlx-vlm/pull/896',
    state: 'Closed',
    date: '2026-04-02',
    summary: 'Gemma4 계열 모델의 chunked prefill 처리 오류를 수정해 추론 안정성을 높였습니다.',
  },
  {
    type: 'Issue',
    title: 'Streaming: raw tool call tokens leak into content chunks instead of tool_calls field',
    repo: 'Blaizzy/mlx-vlm',
    url: 'https://github.com/Blaizzy/mlx-vlm/issues/900',
    state: 'Closed',
    date: '2026-04-03',
    summary: '스트리밍 응답에서 tool call 토큰이 content에 섞여 나오는 문제를 재현·정리해 이슈로 제보했습니다.',
  },
  {
    type: 'Issue',
    title: 'Server leaks thinking tokens for Gemma4 when system prompt is present',
    repo: 'Blaizzy/mlx-vlm',
    url: 'https://github.com/Blaizzy/mlx-vlm/issues/899',
    state: 'Closed',
    date: '2026-04-03',
    summary: '시스템 프롬프트 사용 시 thinking 토큰이 노출되는 현상을 정리해 서버 동작 개선에 기여했습니다.',
  },
  {
    type: 'PR',
    title: 'fix(fiber): warn in dev when priority > 0 useFrame disables auto-render',
    repo: 'pmndrs/react-three-fiber',
    url: 'https://github.com/pmndrs/react-three-fiber/pull/3693',
    state: 'Closed',
    date: '2026-03-05',
    summary: '개발자 경험을 해치던 silent behavior에 경고를 추가해 디버깅 가능성을 높였습니다.',
  },
  {
    type: 'Issue',
    title: '[DX] useFrame with priority > 0 silently disables auto-render — no warning or documentation',
    repo: 'pmndrs/react-three-fiber',
    url: 'https://github.com/pmndrs/react-three-fiber/issues/3692',
    state: 'Closed',
    date: '2026-03-05',
    summary: '문서화되지 않은 렌더링 동작을 이슈로 정리해 문제 인식과 후속 수정으로 연결했습니다.',
  },
]
