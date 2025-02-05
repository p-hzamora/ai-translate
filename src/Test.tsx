// This should show errors
const unused = "this variable is never used";

// This should show error for implicit any
function Sum({ a, b }: { a; b; }): any {
    return a + b;
}

// This should show warning for console
console.log("test");

export function Test() {
    // This should show error for missing dependency in useEffect
    useEffect(() => {
        console.log(unused)
    }, [])

    return <div>Test</div>
}