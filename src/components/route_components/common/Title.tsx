
const Title = ({ subtitle, title }: { subtitle: string, title: string }) => {
    return (
        <div>
            <div id='heading'>
                <h3>{subtitle}</h3>
                <h1>{title}</h1>
            </div>
        </div>
    )
}

export default Title