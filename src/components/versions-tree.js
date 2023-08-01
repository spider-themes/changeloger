import React from 'react';

function VersionsTree( props ) {
	return (
		<ul
			className={
				! props?.isChild ?? false
					? 'changeloger-version-list-wrapper'
					: ''
			}
		>
			{ props.versions.map( ( version ) => {
				const hasChildren = version?.children?.length > 0;

				return (
					<li>
						Version { version.version }
						{ hasChildren ? (
							<VersionsTree
								isChild
								versions={ version?.children }
							/>
						) : null }
					</li>
				);
			} ) }
		</ul>
	);
}

export default VersionsTree;
