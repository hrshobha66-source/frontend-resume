export const formatBytes = (bytes, decimals = 1) => {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const getScoreBadgeStyle = (score) => {
  if (score >= 80) {
    return {
      text: 'text-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      bar: 'bg-emerald-500',
      ring: 'ring-emerald-500',
      label: 'High Match'
    };
  } else if (score >= 70) {
    return {
      text: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      bar: 'bg-amber-500',
      ring: 'ring-amber-500',
      label: 'Moderate Match'
    };
  } else {
    return {
      text: 'text-orange-700',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      bar: 'bg-orange-500',
      ring: 'ring-orange-500',
      label: 'Foundational'
    };
  }
};
