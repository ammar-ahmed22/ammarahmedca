export const displayTimeSince = (prev) => {

    const nowDate = new Date();
    const prevDate = Date.parse(prev)

    const result = {};

    let delta = Math.abs(nowDate - prevDate) / 1000

    const s = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
    }
    
    Object.keys(s).forEach( key => {
        result[key] = Math.floor( delta / s[key]);
        delta -= result[key] * s[key]
    })

    
    const pluralize = val => {
        return val === 1 ? "" : "s";
    }

    if (result.year >= 1){
        if (result.month >= 1){
            return `${result.year} year${pluralize(result.year)} ${result.month} month${pluralize(result.month)} ago`
        }else{
            return `${result.year} year${pluralize(result.year)} ago`
        }
    }else if (result.year === 0){
        if (result.month >= 1){
            return `${result.month} month${pluralize(result.month)} ago`
        }else{
            if (result.week >= 1){
                return `${result.week} week${pluralize(result.week)} ago`
            }else{
                return `${result.day} day${pluralize(result.day)} ago`
            }
        }
    }

    return "hold up"

    
}