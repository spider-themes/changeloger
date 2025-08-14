import React from 'react';

function VersionsTree(props) {
    return (
        <ul
            className={
                !props?.isChild ?? false
                    ? 'changeloger-version-list-wrapper'
                    : ''
            }
        >
            {props.versions.map((version) => {
                const hasChildren = version?.children?.length > 0;

                return (
                    <li key={version.version} className={props?.isChild ? "changeloger-version-list-main-item" : ""}>
                        <a href={`#${props.uniqueId + '-' +version.version}`}>Version {version.version}</a>
                        {hasChildren ? (
                            <VersionsTree
                                isChild
                                versions={version?.children}
                                uniqueId={props.uniqueId}
                            />
                        ) : null}
                    </li>
                );
            })}
        </ul>
    );
}

export default VersionsTree;
